import React from 'react';

import FooterWrapper from '../../../lib/footer/FooterWrapper';

export default function Footer() {
  return (
    <FooterWrapper>
      <div className="pull-right hidden-xs">
        <b>Version</b> 2.3.11
      </div>
      <strong>
        <span>Copyright &copy; 2014-2017 </span>
        <a href="http://almsaeedstudio.com">Almsaeed Studio</a>.
      </strong> All rights reserved.
    </FooterWrapper>
  );
}
