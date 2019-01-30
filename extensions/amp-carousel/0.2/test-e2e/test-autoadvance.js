/**
 * Copyright 2019 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  getSlides,
} from './helpers';

describes.endtoend('AMP carousel autoadvance', {
}, async env => {
  const pageWidth = 600;
  const pageHeight = 600;
  let controller;
  let ampDriver;

  function rect(el) {
    return controller.getElementRect(el);
  }

  beforeEach(async() => {
    controller = env.controller;
    ampDriver = env.ampDriver;

    await controller.navigateTo(
        'http://localhost:8000/test/manual/amp-carousel-0-2/autoadvance.amp.html');
    await ampDriver.toggleExperiment('layers', true);
    await ampDriver.toggleExperiment('amp-carousel-v2', true);
    await controller.setWindowRect({
      width: pageWidth,
      height: pageHeight,
    });
    await controller.navigateTo(
        'http://localhost:8000/test/manual/amp-carousel-0-2/autoadvance.amp.html');
  });

  it('should move forwards', async() => {
    const slides = await getSlides(controller);

    await expect(rect(slides[1])).to.include({x: 0});
    await expect(rect(slides[2])).to.include({x: 0});
    await expect(rect(slides[0])).to.include({x: 0});
  });

  it.skip('should not advance while the user is touching', async() => {
    // TODO(sparhami) Implement when touch actions are supported.
  });
});