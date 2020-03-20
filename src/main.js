import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Gravatar from 'vue-gravatar';
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer, LMarker, LControl, LPolyline, LPopup } from 'vue2-leaflet';
import { Icon } from 'leaflet';

Vue.component('v-gravatar', Gravatar);
Vue.component('v-gravatar', Gravatar);
Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-control', LControl);
Vue.component('l-polyline', LPolyline);
Vue.component('l-popup', LPopup);

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

import { tools } from './tools'
Vue.mixin(tools);

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

 window.axios = axios.create({
        baseURL: '',
        params : {
          token : false
        },
        headers: {'Authorization': ""}
        });


new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
  	window.axios.interceptors.request.use((config) => {
  		if(this.$store.state.user_token){
  			config.url+='?token='+this.$store.state.user_token  		
  		}
  		return config
  	}, error => {
  		return console.log(error)
  	}
  	)
  }
}).$mount('#app')