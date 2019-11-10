import { setWorldConstructor } from 'cucumber';

export class CustomWorld {
  constructor(params: any) {

  }

  public hostname = '';
}

setWorldConstructor(CustomWorld);
