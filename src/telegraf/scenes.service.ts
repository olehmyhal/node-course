import { Scene } from "./scenes/scene.interface";

export class SceneGenerator {
  constructor(private sceneParam: Scene) {}

  init() {
    this.sceneParam.createScene();
    return this.sceneParam.getScene();
  }
}
