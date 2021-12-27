import { App } from 'vue';
import { Upload } from '@element-plus/icons-vue';
import { ElAside, ElAvatar, ElButton, ElCard, ElCarousel, ElCarouselItem } from 'element-plus';

const components = [ElAside, ElAvatar, ElButton, ElCarousel, ElCarouselItem, ElCard, Upload];

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component);
  }
}
