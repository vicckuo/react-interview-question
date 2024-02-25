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

  const selectDate = (date) => {
    if (!startDate || date < startDate) {
      setStartDate(date);
      setEndDate(null);
    } else if (!endDate || date >= startDate) {
      setEndDate(date);
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
    const previousMonthDays = daysInMonth(
      currentMonth - 1 < 0 ? 11 : currentMonth - 1,
      currentMonth - 1 < 0 ? currentYear - 1 : currentYear
    );
    const totalDays = daysInMonth(currentMonth, currentYear);
    let prevMonthStart = previousMonthDays - firstDay + 1;

    // Previous month's days
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <span
          key={`prev-${prevMonthStart}`}
          className='day other-month'>
          {prevMonthStart++}日
        </span>
      );
    }

    // Current month's days
    for (let day = 1; day <= totalDays; day++) {
      let className = 'day';
      const dayDate = new Date(currentYear, currentMonth, day);
      if (
        (startDate && dayDate.getTime() === startDate.getTime()) ||
        (endDate && dayDate.getTime() === endDate.getTime())
      ) {
        className += ' selected';
      } else if (startDate && endDate && dayDate > startDate && dayDate < endDate) {
        className += ' in-range';
      }
      if (day === todayDate && currentMonth === todayMonth && currentYear === todayYear) {
        className += ' today'; // Add today's class
      }
      days.push(
        <div
          key={`current-${day}`}
          className={className}
          onClick={() => selectDate(dayDate)}>
          {day}日
        </div>
      );
    }

    // Next month's days to fill the grid
    const nextDays = 35 - days.length;
    for (let i = 1; i <= nextDays; i++) {
      days.push(
        <span
          key={`next-${i}`}
          className='day other-month'>
          {i}日
        </span>
      );
    }

    return days;
  };

  console.log('startDate:', startDate);
  console.log('endDate:', endDate);

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
