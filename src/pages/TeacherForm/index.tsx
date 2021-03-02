import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/page-header';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import "./styles.css";

function TeacherForm() {
    const [name, setName ] = useState('');
    const [avatar, setAvatar ] = useState('');
    const [whatsapp, setWhatsapp ] = useState('');
    const [bio, setBio ] = useState('');

    const [subject, setSubject ] = useState('');
    const [cost, setCost ] = useState('');
    

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' }
    ]);

    function addNewScheduleItem(){
        setScheduleItems([
            ...scheduleItems,
            {
                week_day: 0,
                from: '',
                to: ''
            }
        ]);
    }

    function handleCreateClass(event: FormEvent) {
        event.preventDefault();
        console.log({
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost
        })
    }

    function setScheduleValue(position: number, field: string, value:string){
        const updatedScheduleItem = scheduleItems.map((scheduleItem, index) => {
            if(index === position) {
                return { ...scheduleItem, [field]:value }
            }

            return scheduleItem;
        });

        setScheduleItems(updatedScheduleItem);
    }

    return(
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrível que você quer dar aulas" 
                description="O primeiro passo é preencher o formulário de inscrição"
            />
            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input 
                            label="Nome completo" 
                            name="name" 
                            value={name} 
                            onChange={(event) => { setName(event.target.value) }}
                        />
                        <Input 
                            label="Avatar" 
                            name="avatar" 
                            value={avatar}
                            onChange={(event) => {setAvatar(event.target.value)}}
                        />
                        <Input 
                            label="Whatsapp" 
                            name="whatsapp" 
                            value={whatsapp}
                            onChange={(event) => {setWhatsapp(event.target.value)}}
                        />
                        <Textarea 
                            label="Biografia" 
                            name="bio"  
                            value={bio}
                            onChange={(event) => {setBio(event.target.value)}}
                        />
                        
                    </fieldset>
                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select 
                            label="Matéria" 
                            name="subject"
                            value={subject}
                            onChange={(event) => { setSubject(event.target.value) }}
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Ciências', label: 'Ciências' },
                                { value: 'Matemática', label: 'Matemática' },
                                { value: 'Música', label: 'Música' },
                            ]}
                        />
                        <Input 
                            label="Custo da sua hora por aula" 
                            name="cost"
                            value={cost}
                            onChange={(event) => { setCost(event.target.value) }}
                            />
                        
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis 
                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                            </button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        label="Dia da Semana"
                                        name="week-day"
                                        onChange={event => setScheduleValue(index, 'week_day', event.target.value)}
                                        options={[
                                            { value: '0', label: 'Domingo' },
                                            { value: '1', label: 'Segunda-feira' },
                                            { value: '2', label: 'Terça-feira' },
                                            { value: '3', label: 'Quarta-feira' },
                                            { value: '4', label: 'Quinta-feira' },
                                            { value: '5', label: 'Sexta-feira' },
                                            { value: '6', label: 'Sábado' },
                                        ]}
                                    />

                                    <Input 
                                        label="Das" 
                                        name="from" 
                                        type="time"
                                        onChange={event => setScheduleValue(index, 'from', event.target.value)}
                                    />
                                    <Input 
                                        label="Até" 
                                        name="to" 
                                        type="time"
                                        onChange={event => setScheduleValue(index, 'to', event.target.value)}
                                    />

                                </div>
                            )
                        })}
                        
                        

                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante! <br/>

                            Preencha todos os dados
                        </p>
                        <button type="submit">Salvar cadastro</button>
                    </footer>
                </form>
            </main>
        </div>


    )
}

export default TeacherForm