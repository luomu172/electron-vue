import Vue from 'vue';

import Toast from '@/components/ui-share/toast/toast.vue';
import PopUpDialog from '@/components/ui-share/dialog/pop-up-dialog.vue';
import GlobalDialog from '@/components/ui-share/dialog/global-dialog.vue';
import SparkIcon from '@/components/spark-share/spark-icon/spark-icon.vue';
import NetError from '@/components/ui-share/net-error/net-error.vue';
import Loading from '@/components/ui-share/loading/loading.vue';

Vue.component('toast', Toast);
Vue.component('pop-up-dialog', PopUpDialog);
Vue.component('global-dialog', GlobalDialog);
Vue.component('net-error', NetError);
Vue.component('loading', Loading);
Vue.component('spark-icon', SparkIcon);


