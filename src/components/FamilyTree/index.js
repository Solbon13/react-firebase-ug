import React, {Component} from 'react';
import {withFirebase} from '../Firebase';
import './global.css';
import { FamDiagram } from 'basicprimitivesreact';
import primitives from "basicprimitives";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

class FamilyTreePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            persons: [],
        };
    }

    componentDidMount() {
        this.setState({loading: true});
        this.props.firebase.persons().on('value', snapshot => {
            const personsObject = snapshot.val();
            const personsList = Object.keys(personsObject).map(key => ({
                ...personsObject[key],
                uid: key,
            }));
            this.setState({
                persons: personsList,
                loading: false,
            });
        });
    }

    //
    componentWillUnmount() {
        this.props.firebase.users().off();
    }

    render() {
        const {persons, loading} = this.state;
        let personTree = [];
        let annotations = [];
        persons.forEach((elem, index) => {
            let parents= [];
            if ("93678597-80c9-4410-bf8c-59564ef1e735" !== elem.mother)
                parents.push(elem.mother);
            if ("93678597-80c9-4410-bf8c-59564ef1e735" !== elem.father)
                parents.push(elem.father);

            let image;
            if ("Жен." !== elem.floor)
                image = "photos/b.png";
            else
                image = "photos/a.png";
            let person = {
                id: elem.uid,
                parents: parents,
                title: elem.firstName + " " + elem.name,
                label: elem.firstName + " " + elem.name,
                description: elem.floor + " " + elem.dateBith,
                image: image,
                itemTitleColor: "#4b0082"};

            if ("93678597-80c9-4410-bf8c-59564ef1e735" !== elem.uid)
            personTree.push(person);

            let annotation ={
                    annotationType: primitives.common.AnnotationType.Connector,
                    fromItem: elem.uid,
                    toItem: elem.partner,
                    label: <div className="BadgeSymbol">Супруг</div>,
                    labelSize: new primitives.common.Size(40, 20),
                    connectorShapeType: primitives.common.ConnectorShapeType.OneWay,
                    color: primitives.common.Colors.Red,
                    offset: 0,
                    lineWidth: 2,
                    lineType: primitives.common.LineType.Dashed,
                    connectorPlacementType: primitives.common.ConnectorPlacementType.Offbeat,
                    selectItems: false};
            if ("93678597-80c9-4410-bf8c-59564ef1e735" !== elem.partner)
                annotations.push(annotation);
        });

        const config = {
            pageFitMode: primitives.common.PageFitMode.AutoSize,
            autoSizeMinimum: { width: 100, height: 100 },
            highlightItem: 0,
            cursorItem: 2,
            linesWidth: 1,
            linesColor: "black",
            hasSelectorCheckbox: primitives.common.Enabled.False,
            arrowsDirection: primitives.common.GroupByType.Parents,
            showExtraArrows: false,
            /*hasSelectorCheckbox: primitives.common.Enabled.True,*/
            items: personTree,
            annotations: annotations
        };
        return (
            <div>
                <h1>Древо</h1>
                <div className="Testnp">
                    {/*<PinchZoomPan
                        debug
                        captureWheel
                        min={0.5}
                        max={2.5}

                    >*/}
                    {loading && <div>Loading ...</div>}
                    <TransformWrapper
                        defaultScale={1}
                        defaultPositionX={100}
                        defaultPositionY={100}>
                        <TransformComponent
                            defaultScale={0.1}>
                    <FamDiagram centerOnCursor={true} config={config} />
                        </TransformComponent>
                    </TransformWrapper>
                    {/*</PinchZoomPan>*/}
                </div>

            </div>
        );

    }

}

const UserList = ({persons}) => (
    <ul>
        {persons.map(person => (
            <li key={person.uid}>
                {/*<span>
          <strong>ID:</strong> {user.uid}
        </span>*/}
                <span>
          {person.firstName + " " + person.name}
        </span>
            </li>
        ))}
    </ul>
);

export default withFirebase(FamilyTreePage);
