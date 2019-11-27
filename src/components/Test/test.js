import React from 'react';
import './global.css';
import { OrgDiagram } from 'basicprimitivesreact';
import primitives from 'basicprimitives';

function Test() {


    const config = {
        pageFitMode: primitives.common.PageFitMode.AutoSize,
        autoSizeMinimum: { width: 100, height: 100 },
        cursorItem: 0,
        highlightItem: 0,
        hasSelectorCheckbox: primitives.common.Enabled.True,
        items: [
            {
                id: 0,
                parent: null,
                title: '0Scott Aasrud',
                description: 'VP, Public Sector',
                image: 'photos/f.png'
            },
            {
                id: 1,
                parent: '013529ed-d7c5-4d17-89c1-85517dd32752',
                title: '1Ted Lucas',
                description: 'VP, Human Resources',
                image: 'photos/b.png'
            },
            {
                id: '013529ed-d7c5-4d17-89c1-85517dd32752',
                parent: null,
                title: '2Scott Aasrud',
                description: 'VP, Public Sector',
                image: 'photos/d.png'
            },
            {
                id: 3,
                parent: 0,
                title: '3Ted Lucas',
                description: 'VP, Human Resources',
                image: 'photos/c.png'
            },
            {
                id: 4,
                parent: 0,
                title: '4Fritz Stuger',
                description: 'Business Solutions, US',
                image: 'photos/a.png'
            }
        ]
    };

    return (
        <div className="Testnp">
            <OrgDiagram centerOnCursor={true} config={config} />
        </div>
    );
}

export default Test;