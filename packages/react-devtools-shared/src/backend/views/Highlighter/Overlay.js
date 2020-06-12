/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

// Note that the Overlay components are not affected by the active Theme,
// because they highlight elements in the main Chrome window (outside of devtools).
// The colors below were chosen to roughly match those used by Chrome devtools.

export default class Overlay {
  hides = [];

  remove() {
    this.hides.forEach(hide => {
      hide();
    });
    this.hides = [];
  }

  inspect(nodes: Array<HTMLElement>, name?: ?string) {
    const elements = nodes.filter(node => node.type !== 'plain-text');

    if (elements.length === 0) {
      return;
    }

    if (this.hides.length > 0) {
      this.remove();
    }

    this.hides = elements.map((element, index) => {
      const originalStyle = element.props.style;
      element.props.style = {
        ...element.props.style,
        'outline': '1PX solid #1B73FA',
      }
      element.update();
      return () => {
        element.props.style = originalStyle;
        element.update();
      }
    });
  }
}
