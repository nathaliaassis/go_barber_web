import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FiPower, FiClock } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Section,
  Appointment,
  Calendar,
  NextAppointment,
} from './styles';

import logoImg from '../../assets/logo.svg'

import { useAuth } from '../../hooks/AuthContext';
import api from '../../services/api';

interface MonthAvailability {
  day: number;
  available: boolean;
}

const Dashboard: React.FC = () => {

  const { user, signOut } = useAuth();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [monthAvailability, setMonthAvailability] = useState<MonthAvailability[]>([]);
  const [dayAvailability, setDayAvailability] = useState([]);

  const handleDayChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day)
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    api.get(`/providers/${user.id}/month-availability`, {
      params: {
        year: currentMonth.getFullYear(),
        month: currentMonth.getMonth() + 1,
      }
    }).then(response =>
      setMonthAvailability(response.data)
    );
  }, [currentMonth, user.id]);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);


  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt='GoBarber' />

          <Profile>
            <img
              src={user.avatar_url || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwKuR2JotbnJbso-Z_xvuajeDaSV-_x88QQw&usqp=CAU'}
              alt={user.name}
            />
            <div>
              <span>Bem-vindo (a),</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button
            type='button'
            onClick={signOut}
          >
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-Feira</span>
          </p>
          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src={user.avatar_url || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwKuR2JotbnJbso-Z_xvuajeDaSV-_x88QQw&usqp=CAU'}
                alt={user.name}
              />
              <strong>Diego Fernandes</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>

          </NextAppointment>

          <Section>
            <strong>Manhã</strong>

            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src={user.avatar_url || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwKuR2JotbnJbso-Z_xvuajeDaSV-_x88QQw&usqp=CAU'}
                  alt={user.name}
                />
                <strong>Diego Fernandes</strong>
              </div>
            </Appointment>
          </Section>
          <Section>
            <strong>Tarde</strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src={user.avatar_url || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwKuR2JotbnJbso-Z_xvuajeDaSV-_x88QQw&usqp=CAU'}
                  alt={user.name}
                />
                <strong>Diego Fernandes</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['D ', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            months={['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']}
            fromMonth={new Date()}
            selectedDays={selectedDate}
            onMonthChange={handleMonthChange}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            onDayClick={handleDayChange}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] }
            }}
          />
        </Calendar>
      </Content>
    </Container>
  );
}

export default Dashboard;
