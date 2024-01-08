import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export function LinkPage({ text, address }) {
    return (
        <Link href={address} underline="none" sx={ {fontFamily: 'Roboto, sans-serif',color: '#F49881', fontSize:'16px', fontWeight: 500 }}>
                {text}
            </Link>
    );
}
