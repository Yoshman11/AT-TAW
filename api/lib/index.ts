import PostController from './controllers/post.controller';
import App from './app';
import IndexController from "./controllers/index.controller";

const app: App = new App([
   new PostController(),
   new IndexController(),
]);

app.listen();