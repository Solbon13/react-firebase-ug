import React, {Component} from 'react';
import {withFirebase} from '../Firebase';
import s from './global.css';
import {FamDiagram} from 'basicprimitivesreact';
import primitives from "basicprimitives";
import delUser from '../../assets/images/user_delete.svg'
import addUser from '../../assets/images/user_add.svg'
import editUser from '../../assets/images/user_edit.svg'
import ReactModal from 'react-modal';
import {RadioGroup, Radio} from './Radio';


class FamilyTreePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            operation: "", //редактирование или добавление
            loading: false, //загрузка
            persons: [], //персоны все
            selectedKindred: 'father',
            accessPerson: [],
            selectedFloor: "",
            partner: "",
            mother: "",
            person: {
                dateBith: "",
                father: "",
                firstName: "",
                floor: ".",
                mother: "",
                name: "",
                partner: "",
                uid: "",
                userEdit: ""
            }
        };

        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleCloseModalSave = this.handleCloseModalSave.bind(this);

        this.onChange = this.onChange.bind(this);

        this.handleChangeRadio = this.handleChangeRadio.bind(this);

        this.handleChangeComboBoxFather = this.handleChangeComboBoxFather.bind(this);
        this.handleChangeComboBoxMother = this.handleChangeComboBoxMother.bind(this);
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
        this.props.firebase.users().on('value', snapshot => {
            const personsObject = snapshot.val();
            const personsList = Object.keys(personsObject).map(key => ({
                ...personsObject[key],
                uid: key,
            }));
            this.setState({
                accessPerson: personsList,
                loading: false,
            });
        });
    }

    //
    componentWillUnmount() {
        this.props.firebase.users().off();
    }

    handleCloseModal() {
        this.setState({showModal: false});
    }

    handleCloseModalSave() {
        this.state.person.userEdit = this.props.firebase.auth.currentUser.email;
        this.setState({showModal: false});
        const uuidv1 = require('uuid/v1');
        let uid = uuidv1();
        if (this.state.operation == "add")
            this.state.person.uid = uid;


        if (this.state.selectedValue == "father") {
            this.state.person.father = this.state.partner;
            this.state.person.mother = this.state.mother;
        } else {
            /*let personTemp = this.state.persons.filter(item => item.uid === this.state.partner)[0];
            /!*выбор сделать родителя*!/
            personTemp.father = this.state.person.uid;

            this.props.firebase.persons().child('/' + personTemp.uid)
                .set(personTemp);*/
        }
        this.state.person.userEdit = this.props.firebase.auth.currentUser.email;


        this.props.firebase.persons().child('/' + this.state.person.uid)
            .set(this.state.person);

        /*/!*this.props.firebase.persons().push(this.state.person);*!/
        this.props.firebase.persons().child('/' + uid)
            .set(this.state.person);*/
    }

    onChange(e) {
        this.setState({});
        if (e.target.name == 'name')
            this.state.person.name = e.target.value;
        if (e.target.name == 'firstName')
            this.state.person.firstName = e.target.value;
        console.log(e.target.name == 'name')
        console.log(this.state.person)
    }

    handleChangeRadio(value) {
        if (value == 'womanFloor'){
            this.setState({selectedFloor: value});
            this.state.person.floor = "Жен.";
        }

        if (value == 'manFloor'){
            this.setState({selectedFloor: value});
            this.state.person.floor = "Муж.";
        }

        if (value == 'children'){
            this.setState({selectedKindred: value});
        }

        if (value == 'father'){
            this.setState({selectedKindred: value});
        }

        console.log(value)
    }

    handleChangeComboBoxFather(event) {
        this.setState({});
        this.state.person.father = event.target.value;
    }

    handleChangeComboBoxMother(event) {
        this.setState({});
        this.state.person.mother = event.target.value;
    }

    render() {
        const {persons, loading} = this.state;
        let personTree = [];
        let annotations = [];
        let currentUser =[];
        if (this.props.firebase.auth.currentUser != null) {
            if (this.state.accessPerson.length > 0){
                currentUser = this.state.accessPerson.filter(item => item.uid == this.props.firebase.auth.currentUser.uid)[0].AccessPerson;
                console.log(currentUser)
            }
        persons.forEach((elem, index) => {

            if (currentUser.indexOf(elem.userEdit) != -1) {

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
                        email: elem.userEdit,
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
            }
    );
        }

        const config = {
            pageFitMode: primitives.common.PageFitMode.AutoSize,

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

            onButtonsRender: (({context: itemConfig}) => {
                return <>
                    <button key="1" className="StyledButton"
                            onClick={(event) => {
                                event.stopPropagation();
                                alert(`Удалить ${itemConfig.id}`);
                                this.props.firebase.persons().child('/' + itemConfig.id)
                                    .remove();
                            }}
                    >
                        <img src={delUser}/>
                    </button>
                    <button key="2" className="StyledButton"
                            onClick={(event) => {
                                event.stopPropagation();
                                let personTemp = persons.filter(item => item.uid === itemConfig.id)[0];
                                this.setState({
                                    showModal: true,
                                    person: personTemp,
                                    operation: "edit"
                                });
                            }}>
                        <img src={editUser}/>
                    </button>
                    <button key="3" className="StyledButton"
                            onClick={(event) => {
                                event.stopPropagation();
                                this.setState({
                                    showModal: true,
                                    person: {
                                        dateBith: "",
                                        father: "",
                                        firstName: "",
                                        floor: ".",
                                        mother: "",
                                        name: "",
                                        partner: "",
                                        uid: "",
                                        userEdit: ""
                                    },
                                    operation: "add"
                                });
                            }}>
                        <img src={addUser}/>
                    </button>
                </>
            })
        };

        let selectPartner = personTree.map((data) =>
            <option
                key={data.id}
                value={data.id}
            >
                {data.title + " - " + data.id}
            </option>
        );

        selectPartner.push(
            <option
                key=""
                value=""
            >
                {""}
            </option>
        );


        return (
            <div>
                <h1>Древо</h1>
                <div>

                    {loading && <div>Loading ...</div>}


                    <FamDiagram centerOnCursor={true} config={config}/>


                </div>
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                    className="ReactModalStyle"
                >
                    <form className={s.form}>
                        <div className="container">
                            <h1>{this.state.person.id}</h1>
                            <fieldset>
                                <legend><b>Фамилия</b></legend>
                                <input type="text" placeholder="Фамилия" name="firstName"
                                       value={this.state.person !== undefined ? this.state.person.firstName : 0}
                                       onChange={this.onChange}/>
                            </fieldset>

                            <fieldset>
                                <legend><b>Имя</b></legend>
                                <input type="text" placeholder="Имя" name="name"
                                       value={this.state.person !== undefined ? this.state.person.name : 0}
                                       onChange={this.onChange}/>
                            </fieldset>

                            <fieldset>
                                <legend><b>Дата рождения</b></legend>
                                <input type="date" list="dateBith"
                                       value={this.state.person !== undefined ? this.state.person.dateBith : 0}
                                       onChange={this.onChange}/>
                            </fieldset>

                            <fieldset>
                                <legend><b>Пол</b></legend>
                                <RadioGroup
                                    name="Floor"
                                    selectedValue={this.state.person.floor == "Жен." ? "womanFloor" : "manFloor"}
                                    onChange={this.handleChangeRadio}>
                                    <label>
                                        <Radio value="manFloor"/>Муж.
                                    </label>
                                    <label>
                                        <Radio value="womanFloor"/>Жен.
                                    </label>
                                </RadioGroup>
                            </fieldset>

                            {/*<RadioGroup
                                name="Kindred"
                                selectedValue={this.state.selectedKindred}
                                onChange={this.handleChangeRadio}>
                                <label>
                                    <Radio value="children"/>Потомок
                                </label>
                                <label>
                                    <Radio value="father"/>Предок
                                </label>
                            </RadioGroup>*/}

                            <p>Отец</p>
                            <p><select onChange={this.handleChangeComboBoxFather} value={this.state.person.father}>{selectPartner}</select></p>
                            <p>Отец</p>
                            <p><select onChange={this.handleChangeComboBoxMother} value={this.state.person.mother}>{selectPartner}</select> </p>
                        </div>


                    </form>
                    <button onClick={this.handleCloseModal}>Отмена</button>
                    <button onClick={this.handleCloseModalSave}>Сохранить</button>
                </ReactModal>

            </div>
        );

    }

}


export default withFirebase(FamilyTreePage);
