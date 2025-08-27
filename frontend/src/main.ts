import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Aura from "@primeuix/themes/aura";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Skeleton from "primevue/skeleton";
import Divider from "primevue/divider";
import 'primeicons/primeicons.css'
import Password from "primevue/password";
const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: "p",
    },
  },
});
app.mount("#app");

//Compenents
app.component("Button", Button);
app.component("Dialog", Dialog);
app.component("InputText", InputText);
app.component("Textarea", Textarea);
app.component("Skeleton", Skeleton);
app.component("Divider", Divider);
app.component("Password", Password);
