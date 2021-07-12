import '@ali/rw';
import assert from 'assert';
import render from '@ali/rw-test-renderer';
import RuleFlow from '@lnpm/lampui-rule-flow';

describe('ALL', () => {
  it('should component custom className is ok', () => {
    const component = render(
      <RuleFlow className="test" />
    );
    assert(component.hasClass('test'));
  });
});
