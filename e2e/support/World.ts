import { setWorldConstructor } from 'cucumber';

export class CustomWorld {
  constructor(params: any) {
    this.attach = params.attach;
  }
  protected attach;
  public hostname = '';
}

setWorldConstructor(CustomWorld);
