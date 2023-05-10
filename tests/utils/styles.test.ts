import { it, expect } from 'vitest';
import { makeStyles } from '../../src/utils/styles';

it('make styles works correctly', () => {
    const style = makeStyles({
        root: {
            color: '#fff',
        },
    });
    expect(style).toEqual({ root: 'go3118290983' });
});
