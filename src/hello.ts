import { HelloController } from './application/controllers/HelloController';

const controller = new HelloController();

export async function handler() {
  return controller.handle();
}
