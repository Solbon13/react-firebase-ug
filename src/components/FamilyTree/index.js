import React, {Component} from 'react';
import {withFirebase} from '../Firebase';
import s from './global.css';
import {FamDiagram} from 'basicprimitivesreact';
import primitives from "basicprimitives";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import delUser from '../../assets/images/user_delete.svg'
import addUser from '../../assets/images/user_add.svg'
import editUser from '../../assets/images/user_edit.svg'
import ReactModal from 'react-modal';
import {RadioGroup, Radio} from './Radio';

class FamilyTreePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            persons: [],
            showModalAdd: false,
            showModalEdit: false,
            uidCurrent: "",
            selectedValue: 'father',
            person: [{
                dateBith: "",
                father: "",
                firstName: "",
                floor: ".",
                mother: "",
                name: "",
                partner: "",
                uid: "",
                userEdit: ""}]
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModalAdd = this.handleCloseModalAdd.bind(this);
        this.handleCloseModalEdit = this.handleCloseModalEdit.bind(this);
        this.handleCloseModalEditSave = this.handleCloseModalEditSave.bind(this);
        this.handleCloseModalAddSave = this.handleCloseModalAddSave.bind(this);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);

        this.handleChange = this.handleChange.bind(this);
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

    handleOpenModal () {
        this.setState({ showModalAdd: true });
    }

    handleCloseModalAdd () {
        this.setState({ showModalAdd: false });
    }

    handleCloseModalEdit () {
        this.setState({ showModalEdit: false });
    }

    handleCloseModalEditSave () {
        this.setState({ showModalEdit: false });
        this.props.firebase.persons().child('/' + this.state.person[0].uid)
            .set(this.state.person[0]);
    }

    handleCloseModalAddSave() {
        this.setState({ showModalAdd: false });
        this.props.firebase.persons().push(this.state.person[0]);
    }

    onChangeName(e){
        this.setState({
            person:[ {
                dateBith: this.state.person[0].dateBith,
                father: this.state.person[0].father,
                firstName: this.state.person[0].firstName,
                floor: this.state.person[0].floor,
                mother: this.state.person[0].mother,
                name: e.target.value,
                partner: this.state.person[0].partner,
                uid: this.state.person[0].uid,
                userEdit: this.props.firebase.auth.currentUser.email
            }]
        });
        console.log(this.state.person)
    }

    onChangeFirstName(e){
        this.setState({
            person:[ {
                dateBith: this.state.person[0].dateBith,
                father: this.state.person[0].father,
                firstName: e.target.value,
                floor: this.state.person[0].floor,
                mother: this.state.person[0].mother,
                name: this.state.person[0].name,
                partner: this.state.person[0].partner,
                uid: this.state.person[0].uid,
                userEdit: this.props.firebase.auth.currentUser.email
            }]
        });
        console.log(this.state.person)
    }

    handleChange(value) {
        this.setState({selectedValue: value});
        if (this.state.selectedValue == "father"){
            this.setState({
                person:[ {
                    dateBith: this.state.person[0].dateBith,
                    father: this.state.uidCurrent,
                    firstName: this.state.person[0].firstName,
                    floor: this.state.person[0].floor,
                    mother: this.state.person[0].mother,
                    name: this.state.person[0].name,
                    partner: this.state.person[0].partner,
                    uid: this.state.person[0].uid,
                    userEdit: this.props.firebase.auth.currentUser.email
                }]
            })}
        else {
            this.setState({
                person: [{
                    dateBith: this.state.person[0].dateBith,
                    father: this.state.person[0].father,
                    firstName: this.state.person[0].firstName,
                    floor: this.state.person[0].floor,
                    mother: this.state.uidCurrent,
                    name: this.state.person[0].name,
                    partner: this.state.person[0].partner,
                    uid: this.state.person[0].uid,
                    userEdit: this.props.firebase.auth.currentUser.email
                }]
            })
        }
    }

    render() {
        const {persons, loading} = this.state;
        let personTree = [];
        let annotations = [];
        persons.forEach((elem, index) => {
            if(!(this.props.firebase.auth.currentUser == null))
                if (this.props.firebase.auth.currentUser.email == elem.userEdit) {
                let parents = [];
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
                    firstName: elem.firstName,
                    name: elem.name,
                    description: elem.floor + " " + elem.dateBith,
                    floor: elem.floor,
                    dateBith: elem.dateBith,
                    image: image,
                    groupTitle: "Group 3",
                    email: "Group 3",
                    itemTitleColor: "#4b0082"
                };

                if ("93678597-80c9-4410-bf8c-59564ef1e735" !== elem.uid)
                    personTree.push(person);

                let annotation = {
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
                    selectItems: false
                };
                if ("93678597-80c9-4410-bf8c-59564ef1e735" !== elem.partner)
                    annotations.push(annotation);
            }
        });

        const config = {
            pageFitMode: primitives.common.PageFitMode.AutoSize,
            autoSizeMinimum: {width: 100, height: 100},
            highlightItem: 0,
            cursorItem: 2,
            linesWidth: 1,
            linesColor: "black",
            hasSelectorCheckbox: primitives.common.Enabled.False,
            arrowsDirection: primitives.common.GroupByType.Parents,
            showExtraArrows: false,
            /*hasSelectorCheckbox: primitives.common.Enabled.True,*/
            items: personTree,
            annotations: annotations,
            hasButtons: primitives.common.Enabled.Auto,
            buttonsPanelSize: 40,
            onButtonsRender: (({ context: itemConfig }) => {
                return <>
                    <button key="1" className="StyledButton"
                            onClick={(event) => {
                                event.stopPropagation();
                                alert(`Удалить ${itemConfig.id}`);
                            }}
                    >
                        <img src={delUser}/>
                    </button>
                    <button key="2" className="StyledButton"
                            onClick={(event) => {
                                event.stopPropagation();
//console.log(persons.filter(item => item.uid === itemConfig.id))
                                this.setState({ showModalEdit: true, person: persons.filter(item => item.uid === itemConfig.id) });
                            }}>
                        <img src={editUser}/>
                    </button>
                    <button key="3" className="StyledButton"
                            onClick={(event) => {
                                event.stopPropagation();
                                this.setState({ showModalAdd: true, uidCurrent: itemConfig.id,
                                    person: [{
                                        dateBith: "",
                                        father: itemConfig.id,
                                        firstName: "",
                                        floor: ".",
                                        mother: "",
                                        name: "",
                                        partner: "",
                                        uid: "",
                                        userEdit: ""}]});
                            }}>
                        <img src={addUser}/>
                    </button>
                </>
            })
        };
        return (
            <div>
                <h1>Древо</h1>
                <div>
                    {/*<PinchZoomPan
                        debug
                        captureWheel
                        min={0.5}
                        max={2.5}

                    >*/}
                    {loading && <div>Loading ...</div>}
                    {/*<TransformWrapper
                        defaultScale={1}
                        defaultPositionX={100}
                        defaultPositionY={100}>
                        <TransformComponent
                            defaultScale={0.1}>*/}
                            <FamDiagram centerOnCursor={true} config={config}/>
                       {/* </TransformComponent>
                    </TransformWrapper>*/}
                    {/*</PinchZoomPan>*/}
                </div>
                <ReactModal
                    isOpen={this.state.showModalAdd}
                    contentLabel="Minimal Modal Example"
                    className="ReactModalStyle"
                >
                    <form className={s.form}>
                        <div className="container">
                            <h1>Добавление записи</h1>
                            <fieldset> <legend><b>Фамилия</b></legend>
                                <input type="text" placeholder="Фамилия" name="email"
                                       value = {this.state.person[0] !== undefined ? this.state.person[0].firstName : 0}
                                       onChange={this.onChangeFirstName}/>
                            </fieldset>

                            <fieldset> <legend><b>Имя</b></legend>
                                <input type="text" placeholder="Имя" name="email"
                                       value = {this.state.person[0] !== undefined ? this.state.person[0].name : 0}
                                       onChange={this.onChangeName}/>
                            </fieldset>

                            <fieldset> <legend><b>Дата рождения</b></legend>
                                <input type="date" list="dateList" value={this.state.person[0] !== undefined ? this.state.person[0].dateBith : 0}/>
                            </fieldset>

                            <RadioGroup
                                name="fruit"
                                selectedValue={this.state.selectedValue}
                                onChange={this.handleChange}>
                                <label>
                                    <Radio value="children" />Предок
                                </label>
                                <label>
                                    <Radio value="father" />Потомок
                                </label>
                            </RadioGroup>

                        </div>


                    </form>
                    <button onClick={this.handleCloseModalAdd}>Отмена</button>
                    <button onClick={this.handleCloseModalAddSave}>Сохранить</button>
                </ReactModal>
                <ReactModal
                    isOpen={this.state.showModalEdit}
                    contentLabel="Minimal Modal Example"
                >
                    <form className={s.form}>
                        <div className="container">
                            <h1>Редактирование записи</h1>
                            <fieldset> <legend><b>Фамилия</b></legend>
                                <input type="text" placeholder="Фамилия" name="email"
                                       value = {this.state.person[0] !== undefined ? this.state.person[0].firstName : 0}
                                       onChange={this.onChangeFirstName}/>
                            </fieldset>

                            <fieldset> <legend><b>Имя</b></legend>
                            <input type="text" placeholder="Имя" name="email"
                                              value = {this.state.person[0] !== undefined ? this.state.person[0].name : 0}
                                              onChange={this.onChangeName}/>
                        </fieldset>

                            <fieldset> <legend><b>Дата рождения</b></legend>
                                <input type="date" list="dateList" value={this.state.person[0] !== undefined ? this.state.person[0].dateBith : 0}/>
                            </fieldset>



                        </div>


                    </form>
                    <button onClick={this.handleCloseModalEdit}>Отмена</button>
                    <button onClick={this.handleCloseModalEditSave}>Сохранить</button>
                </ReactModal>

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
