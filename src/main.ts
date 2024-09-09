
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "./style.css";
import App from './App.vue'
import router from './router'
import VButton from "@/components/VButton.vue";
import VInput from "@/components/VInput.vue";
import VIcon from "@/components/VIcon.vue";
import VSelect from "@/components/VSelect.vue";

const app = createApp(App)

app.use(createPinia())
app.use(router)


// ----------- Global Component ------------
app.component("VButton", VButton);
app.component("VIcon", VIcon);
app.component("VInput", VInput);
app.component("VSelect", VSelect);


app.mount('#app')
