// **********************  计算选择题的选项宽度 1、2、4排版  ************************
export function choiceQuestionHandler (text, baseWidth, targetFontSize, fontFamily) {
  if (!targetFontSize) targetFontSize = 12;
  // 处理选择题的显示问题
  let tagArr = text && text.match(/<p[^>]*><input type="radio"(?:(?!<\/?p>)[\s\S])*<\/p>/gi);
  if (!tagArr) return text;
  let lineWidth = baseWidth || 1200; // 基准屏幕宽度1200
  let maxWidth = 0;
  let realWidthRatio = 1.3 * (targetFontSize / 12); // 公式渲染出来后会变宽
  let optionPerLine;
  let optionClass;
  let span = document.createElement('span');
  span.style['font-family'] = fontFamily;
  // 创建虚拟span来插入body中获取占用的最大宽度
  tagArr.forEach(function (tag) {
    let inner = tag.replace(/<p/, '<span').replace(/<\/p>/, '</span>');
    span.innerHTML = inner;
    document.body.appendChild(span);
    maxWidth = span.offsetWidth * realWidthRatio > maxWidth ? span.offsetWidth * realWidthRatio : maxWidth;
  });
  document.body.removeChild(span);

  // 计算每一行能放几个选项
  optionPerLine = lineWidth / maxWidth;
  if (optionPerLine > 4) {
    optionClass = 'quadruplePerLine';
  } else if (optionPerLine < 2) {
    optionClass = 'singlePerLine';
  } else {
    optionClass = 'doublePerLine';
  }

  // 给每一个选项设置标志类
  let count = 0;
  let classNamePrefix = 'ss-order-';
  text = text.replace(/(<p[^>]*><input type="radio"(?:(?!<\/?p>)[\s\S])*<\/p>)/gi, function (match) {
    count++;
    return match.replace(/(^<[^>]*?p)/, '$1' + ' class="' + classNamePrefix + count + '" ');
  });

  // 在第一个选项最前边补<div>
  text = text.replace(/(<p[^>]*><input type="radio"(?:(?!<\/?p>)[\s\S])*<\/p>)/, fn1('$1'));
  // 在最后一个选项后边补</div>
  text = text.replace(
    new RegExp('(<p class="' + classNamePrefix + count + '" [^>]*><input type="radio"(?:(?!<\\/?p>)[\\s\\S])*<\\/p>)'),
    fn2('$1')
  );

  function fn1 (text) {
    return '<div class="' + optionClass + '" style="max-width: ' + lineWidth + 'px">' + text;
  }

  function fn2 (text) {
    return text + '</div>';
  }

  return text;
}

// **********************  将带公式svg重新渲染成svg  ************************
/**
 * 将带公式svg的img标签重新渲染成svg
 * 为了方便生成后的公式svg能与原有图片对应 会将svg的src设置到返回的svg元素里
 * 入参 nodeList  需要转换的img数组
 *      options 参数
 *        wrapedBySpan 是否用span进行包裹 用于应付在某些浏览器中svg后的标点会出现在行首问题
 * 返回 result  转换好的svg数组
 */
export function svgConvert (nodeList, options = {}) {
  if (!nodeList || !nodeList.length) return;

  const result = [];
  const MATHML_ATTR_NAME = 'data-mml';
  const LATEX_ATTR_NAME = 'data-latex';

  for (let node of nodeList) {
    const svg = renderMath(node);
    if (svg) {
      svg.src = node.src;
      result.push(svg);
    }
  }

  return result;

  /**
       * @description 渲染公式，
       */
  function renderMath (node) {
    try {
      const mml = node.getAttribute(MATHML_ATTR_NAME);
      const latex = node.getAttribute(LATEX_ATTR_NAME);
      let formulaStr = '';

      if (mml) {
        formulaStr = decodeURIComponent(mml);
        const mmlNode = document.createElement('span');
        mmlNode.innerHTML = formulaStr;
        adjustCirNumSize(mmlNode);
        formulaStr = mmlNode.innerHTML;
      } else if (latex) {
        formulaStr = decodeURIComponent(latex.replace(/%/g, '%25'));
      } else {
        return;
      }

      const element = mml ? MathJax.mathml2svg(formulaStr) : MathJax.tex2svg(formulaStr);
      let result = element.firstElementChild;

      if (options && options.wrapedBySpan) {
        const span = document.createElement('span');
        span.style['white-space'] = 'nowrap';
        span.appendChild(result);
        result = span;
      }

      node.parentNode.insertBefore(result, node.nextSibling);
      node.remove();
      return result;
    } catch (err) {
      if (err.message !== 'Unknown node type "mstack"') {
        // mml公式有问题会报这个错
        console.error(err);
      }
    }
  }

  /**
       * @desc: 调整序号大小
       * @params: {HTMLElement} mmlNode
       * @return: null
       * @author: zhoudonghui
       * @date:   2018/7/5
       */
  function adjustCirNumSize (mmlNode) {
    const CIRCLE_NUMBERS = [
      '⓪',
      '①',
      '②',
      '③',
      '④',
      '⑤',
      '⑥',
      '⑦',
      '⑧',
      '⑨',
      '⑩',
      '⑪',
      '⑫',
      '⑬',
      '⑭',
      '⑮',
      '⑯',
      '⑰',
      '⑱',
      '⑲',
      '⑳'
    ];
    const BRACKET_NUMBERS = [
      '⑴',
      '⑵',
      '⑶',
      '⑷',
      '⑸',
      '⑹',
      '⑺',
      '⑻',
      '⑼',
      '⑽',
      '⑾',
      '⑿',
      '⒀',
      '⒁',
      '⒂',
      '⒃',
      '⒄',
      '⒅',
      '⒆',
      '⒇'
    ];

    const ATTRS_ADJUST = { WIDTH: '+20%width', MATH_SIZE: '120%' };
    let mos = mmlNode.querySelectorAll('mo');
    [].forEach.call(mos, mo => {
      if (CIRCLE_NUMBERS.includes(mo.innerHTML) || BRACKET_NUMBERS.includes(mo.innerHTML)) {
        let mpadded = document.createElement('mpadded');
        mo.parentNode.replaceChild(mpadded, mo);
        mpadded.appendChild(mo);
        mpadded.setAttribute('width', ATTRS_ADJUST.WIDTH); // 扩大间距
        mo.setAttribute('mathsize', ATTRS_ADJUST.MATH_SIZE); // 放大公式
      }
    });
  }
}
