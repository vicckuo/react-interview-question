import React, { useState } from 'react';
import './CustomDatePicker.css';

export const CustomDatePicker = () => {
  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(todayMonth);
  const [currentYear, setCurrentYear] = useState(todayYear);

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const selectDate = (year, month, day) => {
    const newDate = new Date(year, month, day).setHours(0, 0, 0, 0);
    if (!startDate || newDate < startDate.getTime() || (startDate && endDate && newDate < endDate.getTime())) {
      setStartDate(new Date(newDate));
      setEndDate(null);
    } else if (!endDate || newDate > startDate.getTime()) {
      setEndDate(new Date(newDate));
    }
  };

  const incrementMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const decrementMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const resetToCurrentMonth = () => {
    setCurrentMonth(todayMonth);
    setCurrentYear(todayYear);
    setStartDate(null);
    setEndDate(null);
  };

  const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

  const renderDays = () => {
    const days = [];
    const firstDay = firstDayOfMonth(currentMonth, currentYear);
    const previousMonthDays = daysInMonth(currentMonth - 1 < 0 ? 11 : currentMonth - 1, currentYear);
    const totalDays = daysInMonth(currentMonth, currentYear);
    let prevMonthStart = previousMonthDays - firstDay + 1;

    for (let i = 0; i < firstDay; i++) {
      days.push(renderDay(prevMonthStart, currentMonth - 1, currentYear, true));
      prevMonthStart++;
    }

    for (let day = 1; day <= totalDays; day++) {
      days.push(renderDay(day, currentMonth, currentYear, false));
    }

    const daysInNextMonth = 35 - days.length;
    for (let i = 1; i <= daysInNextMonth; i++) {
      days.push(renderDay(i, currentMonth + 1, currentYear, true));
    }

    return days;
  };

  const renderDay = (day, month, year, isOtherMonth) => {
    const dayDate = new Date(year, month, day).setHours(0, 0, 0, 0);
    const isToday = day === todayDate && month === todayMonth && year === todayYear;
    let className = 'day';

    if (startDate && dayDate === startDate.getTime()) {
      className += ' selected';
    } else if (endDate && dayDate === endDate.getTime()) {
      className += ' selected';
    } else if (startDate && endDate && dayDate > startDate.getTime() && dayDate < endDate.getTime()) {
      className += ' in-range';
    } else if (isOtherMonth) {
      className += ' other-month';
    }

    if (isToday) {
      className += ' today';
    }

    return (
      <div
        key={`${year}-${month}-${day}`}
        className={className}
        onClick={() => selectDate(year, month, day)}>
        {day}日
      </div>
    );
  };

  console.log('startDate: ', startDate);
  console.log('endDate: ', endDate);

  return (
    <div className='calendar'>
      <div className='month-selector'>
        <div
          className='select-button'
          onClick={decrementMonth}>
          &lt;
        </div>
        <span
          className='top-month-selector'
          onClick={resetToCurrentMonth}>
          {currentYear}年{monthNames[currentMonth]}
        </span>
        <div
          className='select-button'
          onClick={incrementMonth}>
          &gt;
        </div>
      </div>
      <div className='days-grid'>{renderDays()}</div>
    </div>
  );
};
