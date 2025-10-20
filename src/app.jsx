import React, { useState } from 'react';
import { Search, Clock, AlertCircle, CheckCircle, User, Pill, Calendar, FileText, Bell, Printer, Download } from 'lucide-react';

const PflegeDashboard = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [filterPriority, setFilterPriority] = useState('alle');
  const [searchTerm, setSearchTerm] = useState('');
  const [completedItems, setCompletedItems] = useState({
    '2-anord-0': true, '2-anord-1': true,
    '3-anord-0': true, '3-anord-1': true,
    '4-anord-0': true,
    '5-anord-0': true,
    '6-anord-0': true,
    '7-anord-0': true,
    '8-anord-0': true, '8-anord-1': true,
    '10-anord-0': true, '10-anord-1': true,
    '11-anord-0': true,
    '13-anord-0': true,
    '14-anord-0': true, '14-anord-1': true,
    '15-anord-0': true,
    '16-anord-0': true,
  });
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [roomSelectorOpen, setRoomSelectorOpen] = useState(false);
  const [uebergabeTyp, setUebergabeTyp] = useState('frueh-spaet');
  const [quickViewMode, setQuickViewMode] = useState(false);
  const [showEmptyBeds, setShowEmptyBeds] = useState(false);
  const [filterPostOp, setFilterPostOp] = useState(false);
  const [filterISO, setFilterISO] = useState(false);
  const [filterDiabetes, setFilterDiabetes] = useState(false);
  const [filterNeuaufnahme, setFilterNeuaufnahme] = useState(false);
  const [filterDrainagen, setFilterDrainagen] = useState(false);
  const [filterDrainageZug, setFilterDrainageZug] = useState(false);
  const [notizen, setNotizen] = useState({});
  const [gesperrteBetten, setGesperrteBetten] = useState({});
  const [sperrgrundInput, setSperrgrundInput] = useState({});
  const [showPrintView, setShowPrintView] = useState(false);

  const patienten = [
    { 
      id: 1, zimmer: '1 T', name: 'Maria Schmidt', geschlecht: 'w', alter: 72, prioritaet: 'niedrig', 
      diagnose: 'Postop. Cholezystektomie', aufnahme: '2025-10-03', diabetes: false, cave: 'Penicillin-Allergie', 
      drainagen: 1, 
      drainageDetails: [
        { typ: 'Redon', lage: 'subfaszial', menge: '120ml/24h', farbe: 'serös', zug: 'morgen' }
      ], 
      medikamente: [
        { name: 'Ibuprofen 600mg', zeit: '08:00', verabreicht: true },
        { name: 'Pantoprazol 40mg', zeit: '08:00', verabreicht: false }
      ], 
      anordnungen: ['Kostaufbau', 'Mobilisation'], 
      auffaelligkeiten: [], 
      vitalwerte: { temp: '36.6', blutdruck: '125/75', puls: '70' } 
    },
    { 
      id: 2, zimmer: '1 F', name: 'Ingrid Fischer', geschlecht: 'w', alter: 67, prioritaet: 'niedrig', 
      diagnose: 'Postop. Nabelhernien-OP', aufnahme: '2025-10-03', diabetes: false, cave: null, 
      drainagen: 0, drainageDetails: [], 
      medikamente: [{ name: 'Ibuprofen 600mg', zeit: '08:00', verabreicht: true }], 
      anordnungen: ['Vollkost', 'Mobilisation'], 
      auffaelligkeiten: [], 
      vitalwerte: { temp: '36.6', blutdruck: '132/82', puls: '74' } 
    },
    { 
      id: 3, zimmer: '2 T', name: 'Petra Wagner', geschlecht: 'w', alter: 45, prioritaet: 'niedrig', 
      diagnose: 'Postop. Appendektomie', aufnahme: '2025-10-15', diabetes: false, cave: null, 
      drainagen: 0, drainageDetails: [], 
      medikamente: [{ name: 'Metamizol 1g', zeit: '08:00', verabreicht: true }], 
      anordnungen: ['Vollkost', 'Mobilisation'], 
      auffaelligkeiten: [], 
      vitalwerte: { temp: '36.5', blutdruck: '118/72', puls: '68' } 
    },
    { 
      id: 17, zimmer: '2 F', name: '', geschlecht: '', alter: null, prioritaet: 'leer', 
      diagnose: '', aufnahme: '', diabetes: false, cave: null, drainagen: 0, drainageDetails: [], 
      medikamente: [], anordnungen: [], auffaelligkeiten: [], 
      vitalwerte: { temp: '', blutdruck: '', puls: '' } 
    },
    { 
      id: 4, zimmer: '3 T', name: 'Monika Lang', geschlecht: 'w', alter: 58, prioritaet: 'mittel', 
      diagnose: 'Narbenhernie präoperativ', aufnahme: '2025-10-14', diabetes: true, cave: null, 
      drainagen: 0, drainageDetails: [], 
      medikamente: [{ name: 'Enoxaparin 40mg', zeit: '20:00', verabreicht: false }], 
      anordnungen: ['OP-Vorbereitung'], 
      auffaelligkeiten: [], 
      vitalwerte: { temp: '36.5', blutdruck: '118/72', puls: '64' } 
    },
    { 
      id: 5, zimmer: '3 F', name: 'Andrea Zimmermann', geschlecht: 'w', alter: 39, prioritaet: 'mittel', 
      diagnose: 'Akute Cholezystitis', aufnahme: '2025-10-15', diabetes: false, cave: 'Latex-Allergie', 
      drainagen: 0, drainageDetails: [], 
      medikamente: [
        { name: 'Metamizol 1g', zeit: '08:00', verabreicht: true },
        { name: 'Buscopan 10mg', zeit: '12:00', verabreicht: false }
      ], 
      anordnungen: ['Nahrungskarenz'], 
      auffaelligkeiten: ['Koliken'], 
      vitalwerte: { temp: '37.8', blutdruck: '125/75', puls: '82' } 
    },
    { 
      id: 6, zimmer: '4 T', name: 'Hans Müller', geschlecht: 'm', alter: 68, prioritaet: 'mittel', 
      diagnose: 'Postop. Sigmaresektion', aufnahme: '2025-09-30', diabetes: true, cave: 'Marcumar', 
      drainagen: 1, 
      drainageDetails: [
        { typ: 'Robinson', lage: 'pelvin', menge: '95ml/24h', farbe: 'serös-blutig', zug: 'nein' }
      ], 
      medikamente: [{ name: 'Metronidazol 500mg', zeit: '08:00', verabreicht: true }], 
      anordnungen: ['Kostaufbau Stufe 2'], 
      auffaelligkeiten: ['Flatus vorhanden'], 
      vitalwerte: { temp: '36.9', blutdruck: '128/78', puls: '82' } 
    },
    { 
      id: 7, zimmer: '4 F', name: 'Thomas Becker', geschlecht: 'm', alter: 54, prioritaet: 'niedrig', 
      diagnose: 'Postop. Leistenhernien-OP', aufnahme: '2025-10-15', diabetes: false, cave: null, 
      drainagen: 0, drainageDetails: [], 
      medikamente: [{ name: 'Ibuprofen 600mg', zeit: '08:00', verabreicht: true }], 
      anordnungen: ['Mobilisation'], 
      auffaelligkeiten: [], 
      vitalwerte: { temp: '36.5', blutdruck: '122/78', puls: '68' } 
    },
    { 
      id: 8, zimmer: '5 T', name: 'Klaus Schneider', geschlecht: 'm', alter: 81, prioritaet: 'hoch', 
      diagnose: 'Mechanischer Ileus', aufnahme: '2025-10-15', diabetes: true, cave: 'Schrittmacher', 
      drainagen: 0, drainageDetails: [], 
      medikamente: [{ name: 'Elektrolyt-Infusionslösung 153 1000ml', zeit: '08:00', verabreicht: true }], 
      anordnungen: ['Nahrungskarenz', 'Magensonde'], 
      auffaelligkeiten: ['Erbrechen'], 
      vitalwerte: { temp: '37.8', blutdruck: '148/92', puls: '96' } 
    },
    { 
      id: 18, zimmer: '5 F', name: '', geschlecht: '', alter: null, prioritaet: 'leer', 
      diagnose: '', aufnahme: '', diabetes: false, cave: null, drainagen: 0, drainageDetails: [], 
      medikamente: [], anordnungen: [], auffaelligkeiten: [], 
      vitalwerte: { temp: '', blutdruck: '', puls: '' } 
    },
    { 
      id: 9, zimmer: '6 T', name: 'Wolfgang Krause', geschlecht: 'm', alter: 71, prioritaet: 'hoch', 
      diagnose: 'Mesenterialinfarkt postop.', aufnahme: '2025-10-02', diabetes: true, cave: 'Niereninsuffizienz', 
      drainagen: 2, 
      drainageDetails: [
        { typ: 'Redon', lage: 'subfaszial links', menge: '240ml/24h', farbe: 'serös-blutig', zug: 'nein' },
        { typ: 'Redon', lage: 'subfaszial rechts', menge: '180ml/24h', farbe: 'serös', zug: 'übermorgen' }
      ], 
      medikamente: [{ name: 'Heparin perfusor', zeit: '08:00', verabreicht: true }], 
      anordnungen: ['Intensivpflege', 'Laktat alle 4h'], 
      auffaelligkeiten: ['RR instabil'], 
      vitalwerte: { temp: '37.9', blutdruck: '95/58', puls: '118' } 
    },
    { 
      id: 10, zimmer: '6 F', name: 'Friedrich Braun', geschlecht: 'm', alter: 77, prioritaet: 'mittel', 
      diagnose: 'Postop. Hemikolektomie', aufnahme: '2025-09-29', diabetes: false, cave: 'ASS-Intoleranz', 
      drainagen: 1, 
      drainageDetails: [
        { typ: 'Easy-Flow', lage: 'im Wundbett', menge: '65ml/24h', farbe: 'serös', zug: 'heute' }
      ], 
      medikamente: [
        { name: 'Enoxaparin 40mg', zeit: '08:00', verabreicht: true },
        { name: 'Lactulose 15ml', zeit: '08:00', verabreicht: false }
      ], 
      anordnungen: ['Mobilisation'], 
      auffaelligkeiten: ['Kein Stuhlgang'], 
      vitalwerte: { temp: '36.8', blutdruck: '145/88', puls: '78' } 
    },
    { 
      id: 11, zimmer: '7 T', name: 'Günter Schulz', geschlecht: 'm', alter: 83, prioritaet: 'mittel', 
      diagnose: 'Hemikolektomie', aufnahme: '2025-10-02', diabetes: true, cave: 'Sturzrisiko', 
      drainagen: 1, 
      drainageDetails: [
        { typ: 'Redon', lage: 'abdominal', menge: '150ml/24h', farbe: 'serös-blutig', zug: 'morgen' }
      ], 
      medikamente: [{ name: 'Metamizol 1g', zeit: '08:00', verabreicht: true }], 
      anordnungen: ['Mobilisation Physio'], 
      auffaelligkeiten: ['Schmerzen'], 
      vitalwerte: { temp: '36.9', blutdruck: '138/82', puls: '84' } 
    },
    { 
      id: 12, zimmer: '7 F', name: 'Heinrich Bauer', geschlecht: 'm', alter: 75, prioritaet: 'hoch', 
      diagnose: 'Perforiertes Ulcus', aufnahme: '2025-10-14', diabetes: false, cave: 'Verwirrtheit', 
      drainagen: 3, 
      drainageDetails: [
        { typ: 'Robinson', lage: 'subhepatisch', menge: '280ml/24h', farbe: 'gallig-serös', zug: 'nein' },
        { typ: 'Robinson', lage: 'subphrenisch links', menge: '190ml/24h', farbe: 'serös-blutig', zug: 'nein' },
        { typ: 'Easy-Flow', lage: 'im Wundbett', menge: '85ml/24h', farbe: 'serös', zug: 'morgen' }
      ], 
      medikamente: [{ name: 'Pantoprazol 40mg', zeit: '08:00', verabreicht: true }], 
      anordnungen: ['Nahrungskarenz'], 
      auffaelligkeiten: ['Vigilanz eingeschränkt'], 
      vitalwerte: { temp: '38.4', blutdruck: '142/88', puls: '102' } 
    },
    { 
      id: 13, zimmer: '8', name: 'Helga Richter', geschlecht: 'w', alter: 79, prioritaet: 'hoch', 
      diagnose: 'Cholangitis, Clostridium difficile', aufnahme: '2025-10-13', diabetes: true, cave: 'Heparin-Allergie', 
      drainagen: 0, drainageDetails: [], 
      medikamente: [{ name: 'Vancomycin 125mg', zeit: '08:00', verabreicht: true }], 
      anordnungen: ['ISOLIERUNG', 'Kontaktisolation'], 
      auffaelligkeiten: ['Diarrhoen', 'Ikterus'], 
      vitalwerte: { temp: '39.1', blutdruck: '138/86', puls: '106' } 
    },
    { 
      id: 19, zimmer: '9', name: '', geschlecht: '', alter: null, prioritaet: 'leer', 
      diagnose: '', aufnahme: '', diabetes: false, cave: null, drainagen: 0, drainageDetails: [], 
      medikamente: [], anordnungen: [], auffaelligkeiten: [], 
      vitalwerte: { temp: '', blutdruck: '', puls: '' } 
    },
    { 
      id: 14, zimmer: '10', name: 'Karl-Heinz Meyer', geschlecht: 'm', alter: 69, prioritaet: 'hoch', 
      diagnose: 'Sigmaresektion, 4MRGN', aufnahme: '2025-09-28', diabetes: true, cave: 'Blutungsneigung', 
      drainagen: 1, 
      drainageDetails: [
        { typ: 'Robinson', lage: 'pelvin', menge: '320ml/24h', farbe: 'serös-eitrig', zug: 'nein' }
      ], 
      medikamente: [{ name: 'Meropenem 1g', zeit: '08:00', verabreicht: true }], 
      anordnungen: ['ISOLIERUNG 4MRGN', 'Schutzkittel'], 
      auffaelligkeiten: ['Wundheilungsstörung'], 
      vitalwerte: { temp: '38.2', blutdruck: '135/82', puls: '94' } 
    },
    { 
      id: 20, zimmer: '11', name: '', geschlecht: '', alter: null, prioritaet: 'leer', 
      diagnose: '', aufnahme: '', diabetes: false, cave: null, drainagen: 0, drainageDetails: [], 
      medikamente: [], anordnungen: [], auffaelligkeiten: [], 
      vitalwerte: { temp: '', blutdruck: '', puls: '' } 
    },
    { 
      id: 21, zimmer: '12 T', name: '', geschlecht: '', alter: null, prioritaet: 'leer', 
      diagnose: '', aufnahme: '', diabetes: false, cave: null, drainagen: 0, drainageDetails: [], 
      medikamente: [], anordnungen: [], auffaelligkeiten: [], 
      vitalwerte: { temp: '', blutdruck: '', puls: '' } 
    },
    { 
      id: 25, zimmer: '12 F', name: '', geschlecht: '', alter: null, prioritaet: 'leer', 
      diagnose: '', aufnahme: '', diabetes: false, cave: null, drainagen: 0, drainageDetails: [], 
      medikamente: [], anordnungen: [], auffaelligkeiten: [], 
      vitalwerte: { temp: '', blutdruck: '', puls: '' } 
    },
    { 
      id: 22, zimmer: '13 T', name: '', geschlecht: '', alter: null, prioritaet: 'leer', 
      diagnose: '', aufnahme: '', diabetes: false, cave: null, drainagen: 0, drainageDetails: [], 
      medikamente: [], anordnungen: [], auffaelligkeiten: [], 
      vitalwerte: { temp: '', blutdruck: '', puls: '' } 
    },
    { 
      id: 26, zimmer: '13 F', name: '', geschlecht: '', alter: null, prioritaet: 'leer', 
      diagnose: '', aufnahme: '', diabetes: false, cave: null, drainagen: 0, drainageDetails: [], 
      medikamente: [], anordnungen: [], auffaelligkeiten: [], 
      vitalwerte: { temp: '', blutdruck: '', puls: '' } 
    },
    { 
      id: 23, zimmer: '14 T', name: '', geschlecht: '', alter: null, prioritaet: 'leer', 
      diagnose: '', aufnahme: '', diabetes: false, cave: null, drainagen: 0, drainageDetails: [], 
      medikamente: [], anordnungen: [], auffaelligkeiten: [], 
      vitalwerte: { temp: '', blutdruck: '', puls: '' } 
    },
    { 
      id: 27, zimmer: '14 F', name: '', geschlecht: '', alter: null, prioritaet: 'leer', 
      diagnose: '', aufnahme: '', diabetes: false, cave: null, drainagen: 0, drainageDetails: [], 
      medikamente: [], anordnungen: [], auffaelligkeiten: [], 
      vitalwerte: { temp: '', blutdruck: '', puls: '' } 
    },
    { 
      id: 15, zimmer: '15 T', name: 'Sabine Klein', geschlecht: 'w', alter: 41, prioritaet: 'niedrig', 
      diagnose: 'Postop. Rektumresektion', aufnahme: '2025-10-02', diabetes: false, cave: 'Kontrastmittel-Allergie', 
      drainagen: 2, 
      drainageDetails: [
        { typ: 'Redon', lage: 'pelvin links', menge: '165ml/24h', farbe: 'serös-blutig', zug: 'übermorgen' },
        { typ: 'Redon', lage: 'pelvin rechts', menge: '145ml/24h', farbe: 'serös', zug: 'übermorgen' }
      ], 
      medikamente: [{ name: 'Ibuprofen 600mg', zeit: '08:00', verabreicht: true }], 
      anordnungen: ['Kostaufbau'], 
      auffaelligkeiten: ['Emotional belastet'], 
      vitalwerte: { temp: '36.8', blutdruck: '120/75', puls: '76' } 
    },
    { 
      id: 29, zimmer: '15 F', name: '', geschlecht: '', alter: null, prioritaet: 'leer', 
      diagnose: '', aufnahme: '', diabetes: false, cave: null, drainagen: 0, drainageDetails: [], 
      medikamente: [], anordnungen: [], auffaelligkeiten: [], 
      vitalwerte: { temp: '', blutdruck: '', puls: '' } 
    },
    { 
      id: 16, zimmer: '16 T', name: 'Ernst Weber', geschlecht: 'm', alter: 62, prioritaet: 'mittel', 
      diagnose: 'Analfissur', aufnahme: '2025-10-14', diabetes: false, cave: null, 
      drainagen: 0, drainageDetails: [], 
      medikamente: [{ name: 'Diltiazem-Salbe', zeit: '08:00', verabreicht: true }], 
      anordnungen: ['Sitzbäder'], 
      auffaelligkeiten: ['Schmerzen'], 
      vitalwerte: { temp: '36.7', blutdruck: '132/84', puls: '78' } 
    },
    { 
      id: 30, zimmer: '16 F', name: '', geschlecht: '', alter: null, prioritaet: 'leer', 
      diagnose: '', aufnahme: '', diabetes: false, cave: null, drainagen: 0, drainageDetails: [], 
      medikamente: [], anordnungen: [], auffaelligkeiten: [], 
      vitalwerte: { temp: '', blutdruck: '', puls: '' } 
    },
    { 
      id: 24, zimmer: '17 T', name: '', geschlecht: '', alter: null, prioritaet: 'leer', 
      diagnose: '', aufnahme: '', diabetes: false, cave: null, drainagen: 0, drainageDetails: [], 
      medikamente: [], anordnungen: [], auffaelligkeiten: [], 
      vitalwerte: { temp: '', blutdruck: '', puls: '' } 
    },
    { 
      id: 28, zimmer: '17 F', name: '', geschlecht: '', alter: null, prioritaet: 'leer', 
      diagnose: '', aufnahme: '', diabetes: false, cave: null, drainagen: 0, drainageDetails: [], 
      medikamente: [], anordnungen: [], auffaelligkeiten: [], 
      vitalwerte: { temp: '', blutdruck: '', puls: '' } 
    }
  ];

  const priorityColors = {
    hoch: 'bg-red-50 border-red-300 text-red-700',
    mittel: 'bg-yellow-50 border-yellow-300 text-yellow-700',
    niedrig: 'bg-green-50 border-green-300 text-green-700'
  };

  const getPostOpTage = (aufnahmedatum, diagnose) => {
    if (!diagnose || !diagnose.toLowerCase().includes('postop')) return null;
    const aufnahme = new Date(aufnahmedatum);
    const heute = new Date('2025-10-16');
    const tage = Math.floor((heute - aufnahme) / (1000 * 60 * 60 * 24));
    return tage;
  };

  const getLiegedauer = (aufnahmedatum) => {
    if (!aufnahmedatum) return null;
    const aufnahme = new Date(aufnahmedatum);
    const heute = new Date('2025-10-16');
    const tage = Math.floor((heute - aufnahme) / (1000 * 60 * 60 * 24));
    return tage;
  };

  const formatDatum = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const isNeuaufnahme = (aufnahmedatum) => {
    if (!aufnahmedatum) return false;
    const aufnahme = new Date(aufnahmedatum);
    const heute = new Date('2025-10-16');
    return Math.floor((heute - aufnahme) / (1000 * 60 * 60 * 24)) <= 2;
  };

  const isISOPatient = (diagnose) => {
    if (!diagnose) return false;
    const d = diagnose.toLowerCase();
    return d.includes('clostridium') || d.includes('mrgn') || d.includes('mrsa');
  };

  const filteredPatienten = patienten.filter(p => {
    if (p.prioritaet === 'leer') return false;
    const matchesPriority = filterPriority === 'alle' || p.prioritaet === filterPriority;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.zimmer.includes(searchTerm);
    const zimmerMatch = p.zimmer.match(/\d+/);
    const zimmerNummer = zimmerMatch ? parseInt(zimmerMatch[0]) : 0;
    const matchesRoom = selectedRooms.length === 0 || selectedRooms.includes(zimmerNummer);
    const matchesPostOp = !filterPostOp || getPostOpTage(p.aufnahme, p.diagnose) !== null;
    const matchesISO = !filterISO || isISOPatient(p.diagnose);
    const matchesDiabetes = !filterDiabetes || p.diabetes;
    const matchesNeuaufnahme = !filterNeuaufnahme || isNeuaufnahme(p.aufnahme);
    const matchesDrainagen = !filterDrainagen || p.drainagen > 0;
    const matchesDrainageZug = !filterDrainageZug || (p.drainageDetails && p.drainageDetails.some(d => d.zug === 'heute'));
    return matchesPriority && matchesSearch && matchesRoom && matchesPostOp && matchesISO && matchesDiabetes && matchesNeuaufnahme && matchesDrainagen && matchesDrainageZug;
  });

  const allBeds = patienten.filter(p => {
    if (selectedRooms.length > 0) {
      const zimmerMatch = p.zimmer.match(/\d+/);
      const zimmerNummer = zimmerMatch ? parseInt(zimmerMatch[0]) : 0;
      if (!selectedRooms.includes(zimmerNummer)) return false;
    }
    
    if (p.prioritaet === 'leer') return showEmptyBeds;
    
    const matchesPriority = filterPriority === 'alle' || p.prioritaet === filterPriority;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.zimmer.includes(searchTerm);
    const matchesPostOp = !filterPostOp || getPostOpTage(p.aufnahme, p.diagnose) !== null;
    const matchesISO = !filterISO || isISOPatient(p.diagnose);
    const matchesDiabetes = !filterDiabetes || p.diabetes;
    const matchesNeuaufnahme = !filterNeuaufnahme || isNeuaufnahme(p.aufnahme);
    const matchesDrainagen = !filterDrainagen || p.drainagen > 0;
    const matchesDrainageZug = !filterDrainageZug || (p.drainageDetails && p.drainageDetails.some(d => d.zug === 'heute'));
    
    return matchesPriority && matchesSearch && matchesPostOp && matchesISO && matchesDiabetes && matchesNeuaufnahme && matchesDrainagen && matchesDrainageZug;
  });

  const toggleCheckbox = (pid, type, idx) => {
    const key = `${pid}-${type}-${idx}`;
    setCompletedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleRoom = (n) => {
    setSelectedRooms(prev => prev.includes(n) ? prev.filter(r => r !== n) : [...prev, n]);
  };

  const getRoomBeds = (n) => (n >= 8 && n <= 11) ? '1-Bett' : '2-Bett';

  const getUebergabeInfo = () => {
    if (uebergabeTyp === 'spaet-nacht') return { von: 'Spätdienst', nach: 'Nachtdienst', uhrzeit: '22:00' };
    if (uebergabeTyp === 'nacht-frueh') return { von: 'Nachtdienst', nach: 'Frühdienst', uhrzeit: '06:00' };
    return { von: 'Frühdienst', nach: 'Spätdienst', uhrzeit: '14:00' };
  };

  const uebergabe = getUebergabeInfo();

  const handlePatientClick = (p) => {
    if (p.prioritaet !== 'leer') {
      setSelectedPatient(p);
    }
  };

  const updateNotiz = (patientId, text) => {
    setNotizen(prev => ({ ...prev, [patientId]: text }));
  };

  const toggleBettSperre = (bettId, grund = '') => {
    if (gesperrteBetten[bettId]) {
      setGesperrteBetten(prev => {
        const neu = { ...prev };
        delete neu[bettId];
        return neu;
      });
    } else {
      if (grund.trim()) {
        setGesperrteBetten(prev => ({ ...prev, [bettId]: grund }));
      }
    }
    setSperrgrundInput(prev => {
      const neu = { ...prev };
      delete neu[bettId];
      return neu;
    });
  };

  const hasUnerledigteAnordnungen = (patientId, anordnungenCount) => {
    for (let i = 0; i < anordnungenCount; i++) {
      if (!completedItems[`${patientId}-anord-${i}`]) {
        return true;
      }
    }
    return false;
  };

  const shouldShowBlinklicht = (patientId) => {
    return hasUnerledigteAnordnungen(patientId, patienten.find(p => p.id === patientId)?.anordnungen?.length || 0);
  };

  const hasUnerledigteMedikamente = (patientId, medikamenteCount) => {
    for (let i = 0; i < medikamenteCount; i++) {
      const patient = patienten.find(p => p.id === patientId);
      if (patient && patient.medikamente[i] && !patient.medikamente[i].verabreicht && !completedItems[`${patientId}-med-${i}`]) {
        return true;
      }
    }
    return false;
  };

  const shouldShowMedBlinklicht = (patientId) => {
    return hasUnerledigteMedikamente(patientId, patienten.find(p => p.id === patientId)?.medikamente?.length || 0);
  };

  const handleDrucken = () => {
    setShowPrintView(true);
    setTimeout(() => {
      window.print();
      setShowPrintView(false);
    }, 100);
  };

  const handleExportCSV = () => {
    const dataToExport = quickViewMode ? filteredPatienten : allBeds.filter(p => p.prioritaet !== 'leer');
    
    const csvHeader = 'Zimmer;Patient;Geschlecht;Alter;Diagnose;Aufnahme;Liegedauer;Post-OP Tag;Priorität;Diabetes;CAVE;Drainagen;Temperatur;Blutdruck;Puls;Anordnungen;Auffälligkeiten\n';
    
    const csvRows = dataToExport.map(p => {
      const postOpTag = getPostOpTage(p.aufnahme, p.diagnose);
      const anordnungen = p.anordnungen.join(' | ');
      const auffaelligkeiten = p.auffaelligkeiten.join(' | ');
      
      return [
        p.zimmer,
        p.name,
        p.geschlecht === 'w' ? 'weiblich' : 'männlich',
        p.alter,
        p.diagnose,
        formatDatum(p.aufnahme),
        getLiegedauer(p.aufnahme) + 'd',
        postOpTag !== null ? postOpTag : '',
        p.prioritaet,
        p.diabetes ? 'Ja' : 'Nein',
        p.cave || '',
        p.drainagen,
        p.vitalwerte.temp,
        p.vitalwerte.blutdruck,
        p.vitalwerte.puls,
        anordnungen,
        auffaelligkeiten
      ].join(';');
    }).join('\n');
    
    const csv = csvHeader + csvRows;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `Uebergabe_Station_E2_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @keyframes pulse-red {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }
        .animate-pulse-red {
          animation: pulse-red 2s ease-in-out infinite;
        }
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background: white;
          }
          .print-break {
            page-break-after: always;
          }
        }
      `}</style>
      <div className="bg-blue-600 text-white p-3 shadow-lg no-print">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-base sm:text-lg md:text-2xl font-bold">Dashboard Pflege-Übergabe</h1>
                <p className="text-blue-100 text-xs mt-0.5">Station Allgemeinchirurgie • {uebergabe.von} → {uebergabe.nach}</p>
              </div>
              <div className="text-right">
                <div className="text-xs text-blue-100">Übergabe</div>
                <div className="font-semibold flex items-center gap-1 text-xs sm:text-sm">
                  <Clock size={14} />
                  <span className="whitespace-nowrap">17.10.25 {uebergabe.uhrzeit}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex gap-2 flex-1">
                <div className="flex-1">
                  <label className="text-xs text-blue-100 block mb-1">Ansicht</label>
                  <button 
                    onClick={() => setQuickViewMode(!quickViewMode)}
                    className="w-full bg-white text-gray-800 px-2 py-1.5 rounded text-xs font-medium active:bg-blue-50"
                  >
                    {quickViewMode ? '📋 Schnell' : '🗂️ Karten'}
                  </button>
                </div>
                <div className="flex-1">
                  <label className="text-xs text-blue-100 block mb-1">Übergabe-Typ</label>
                  <select value={uebergabeTyp} onChange={(e) => setUebergabeTyp(e.target.value)} className="w-full bg-white text-gray-800 px-2 py-1.5 rounded text-xs font-medium">
                    <option value="frueh-spaet">Früh → Spät</option>
                    <option value="spaet-nacht">Spät → Nacht</option>
                    <option value="nacht-frueh">Nacht → Früh</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={handleDrucken}
                  className="flex items-center gap-1 bg-white text-gray-800 px-3 py-1.5 rounded text-xs font-medium active:bg-blue-50"
                  title="Drucken"
                >
                  <Printer size={14} />
                  <span className="hidden sm:inline">Drucken</span>
                </button>
                <button 
                  onClick={handleExportCSV}
                  className="flex items-center gap-1 bg-white text-gray-800 px-3 py-1.5 rounded text-xs font-medium active:bg-blue-50"
                  title="Als CSV exportieren"
                >
                  <Download size={14} />
                  <span className="hidden sm:inline">CSV</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-2 sm:p-3 md:p-6">
        <div className="bg-white rounded-lg shadow mb-2 no-print">
          <div className="flex items-center justify-between p-2 cursor-pointer active:bg-gray-50" onClick={() => setRoomSelectorOpen(!roomSelectorOpen)}>
            <h3 className="font-semibold text-sm text-gray-800">Zimmer {selectedRooms.length > 0 && `(${selectedRooms.length})`}</h3>
            <span className="text-gray-500 text-sm">{roomSelectorOpen ? '▲' : '▼'}</span>
          </div>
          {roomSelectorOpen && (
            <div className="p-2 pt-0 border-t">
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-1.5">
                {Array.from({length: 17}, (_, i) => i + 1).map(n => (
                  <button key={n} onClick={() => toggleRoom(n)} className={`p-2 rounded border-2 active:scale-95 ${selectedRooms.includes(n) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300'}`}>
                    <div className="font-bold text-center text-sm mb-0.5">{n}</div>
                    <div className={`text-xs text-center ${selectedRooms.includes(n) ? 'text-blue-100' : 'text-gray-500'}`}>
                      {getRoomBeds(n)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-2 mb-3 no-print">
          <div className="flex flex-col gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2 text-gray-400" size={16} />
              <input type="text" placeholder="Patient oder Zimmer..." className="w-full pl-8 pr-3 py-1.5 border rounded text-sm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex gap-1.5 flex-wrap">
              <button onClick={() => setFilterPriority('alle')} className={`px-2.5 py-1 rounded font-medium text-xs active:scale-95 ${filterPriority === 'alle' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Alle</button>
              <button onClick={() => setFilterPriority('hoch')} className={`px-2.5 py-1 rounded font-medium text-xs active:scale-95 ${filterPriority === 'hoch' ? 'bg-red-600 text-white' : 'bg-red-100 text-red-700'}`}>Hoch</button>
              <button onClick={() => setFilterPriority('mittel')} className={`px-2.5 py-1 rounded font-medium text-xs active:scale-95 ${filterPriority === 'mittel' ? 'bg-yellow-600 text-white' : 'bg-yellow-100 text-yellow-700'}`}>Mittel</button>
              <button onClick={() => setFilterPriority('niedrig')} className={`px-2.5 py-1 rounded font-medium text-xs active:scale-95 ${filterPriority === 'niedrig' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700'}`}>Niedrig</button>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              <button onClick={() => setFilterPostOp(!filterPostOp)} className={`px-2 py-1 rounded text-xs font-medium active:scale-95 ${filterPostOp ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700'}`}>
                Post-OP
              </button>
              <button onClick={() => setFilterDrainagen(!filterDrainagen)} className={`px-2 py-1 rounded text-xs font-medium active:scale-95 ${filterDrainagen ? 'bg-teal-600 text-white' : 'bg-teal-100 text-teal-700'}`}>
                Drainagen
              </button>
              
              <button onClick={() => setFilterDrainageZug(!filterDrainageZug)} className={`px-2 py-1 rounded text-xs font-medium active:scale-95 ${filterDrainageZug ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700'}`}>
                🔧 DR-Zug heute
              </button>
              <button onClick={() => setFilterISO(!filterISO)} className={`px-2 py-1 rounded text-xs font-medium active:scale-95 ${filterISO ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-700'}`}>
                ISO
              </button>
              <button onClick={() => setFilterDiabetes(!filterDiabetes)} className={`px-2 py-1 rounded text-xs font-medium active:scale-95 ${filterDiabetes ? 'bg-orange-600 text-white' : 'bg-orange-100 text-orange-700'}`}>
                DM
              </button>
              <button onClick={() => setFilterNeuaufnahme(!filterNeuaufnahme)} className={`px-2 py-1 rounded text-xs font-medium active:scale-95 ${filterNeuaufnahme ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'}`}>
                NEU
              </button>
              <button onClick={() => setShowEmptyBeds(!showEmptyBeds)} className={`px-2 py-1 rounded text-xs font-medium active:scale-95 ${showEmptyBeds ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
               🛏️ Leere Betten
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {quickViewMode ? (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="bg-purple-600 text-white p-3 flex items-center gap-2">
                <span className="text-xl">📋</span>
                <div>
                  <h2 className="text-sm sm:text-base font-bold">Schnellansicht</h2>
                  <p className="text-xs text-purple-100">Alle Patienten auf einen Blick</p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left p-2 font-semibold whitespace-nowrap">Zi.</th>
                      <th className="text-left p-2 font-semibold">Patient</th>
                      <th className="text-left p-2 font-semibold">Diagnose</th>
                      <th className="text-center p-2 font-semibold whitespace-nowrap">Aufn.</th>
                      <th className="text-center p-2 font-semibold whitespace-nowrap">Liege</th>
                      <th className="text-center p-2 font-semibold whitespace-nowrap">Post-OP</th>
                      <th className="text-center p-2 font-semibold whitespace-nowrap">Prio</th>
                      <th className="text-left p-2 font-semibold">Info</th>
                      <th className="text-center p-2 font-semibold whitespace-nowrap">Vitalwerte</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatienten.map((p, idx) => (
                      <tr key={p.id} className={`border-t ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} active:bg-blue-50 cursor-pointer`} onClick={() => setSelectedPatient(p)}>
                        <td className="p-2">
                          <div className="font-bold text-xs whitespace-nowrap">{p.zimmer}</div>
                        </td>
                        <td className="p-2">
                          <div className="font-medium text-xs">{p.name}</div>
                          <div className="text-xs text-gray-600">{p.geschlecht === 'w' ? '♀' : '♂'} {p.alter}J</div>
                        </td>
                        <td className="p-2">
                          <div className="text-xs line-clamp-2">{p.diagnose}</div>
                        </td>
                        <td className="p-2 text-center">
                          <div className="text-xs text-gray-600 whitespace-nowrap">{formatDatum(p.aufnahme)}</div>
                        </td>
                        <td className="p-2 text-center">
                          <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-xs font-semibold whitespace-nowrap">
                            {getLiegedauer(p.aufnahme)}d
                          </span>
                        </td>
                        <td className="p-2 text-center">
                          {getPostOpTage(p.aufnahme, p.diagnose) !== null ? (
                            <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded text-xs font-semibold whitespace-nowrap">
                              {getPostOpTage(p.aufnahme, p.diagnose)}
                            </span>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                        <td className="p-2 text-center">
                          <span className={`px-1.5 py-0.5 rounded text-xs font-bold ${p.prioritaet === 'hoch' ? 'bg-red-500 text-white' : p.prioritaet === 'mittel' ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white'}`}>
                            {p.prioritaet === 'hoch' ? 'H' : p.prioritaet === 'mittel' ? 'M' : 'N'}
                          </span>
                        </td>
                        <td className="p-2">
                          <div className="flex flex-wrap gap-0.5">
                            {p.diabetes && <span className="bg-orange-500 text-white text-xs px-1 py-0.5 rounded font-bold">DM</span>}
                            {p.cave && <span className="bg-red-600 text-white text-xs px-1 py-0.5 rounded font-bold">⚠</span>}
                            {isNeuaufnahme(p.aufnahme) && <span className="bg-blue-600 text-white text-xs px-1 py-0.5 rounded font-bold">NEU</span>}
                            {isISOPatient(p.diagnose) && <span className="bg-purple-600 text-white text-xs px-1 py-0.5 rounded font-bold">ISO</span>}
                            {getPostOpTage(p.aufnahme, p.diagnose) !== null && (
                              <span className="bg-indigo-600 text-white text-xs px-1 py-0.5 rounded font-bold">OP+{getPostOpTage(p.aufnahme, p.diagnose)}</span>
                            )}
                            {p.drainagen > 0 && (
                              <span className="bg-teal-600 text-white text-xs px-1 py-0.5 rounded font-bold">DR×{p.drainagen}</span>
                            )}
                            {p.drainageDetails && p.drainageDetails.some(d => d.zug === 'heute') && (
                              <span className="bg-green-600 text-white text-xs px-1 py-0.5 rounded font-bold">🔧 ZUG</span>
                            )}
                          </div>
                        </td>
                        <td className="p-2 text-center">
                          <div className="text-xs space-y-0.5 whitespace-nowrap">
                            <div><span className="font-semibold">T:</span> {p.vitalwerte.temp}°C</div>
                            <div><span className="font-semibold">RR:</span> {p.vitalwerte.blutdruck}</div>
                            <div><span className="font-semibold">P:</span> {p.vitalwerte.puls}</div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-gray-100 p-2 text-xs text-gray-600">
                <strong>Tipp:</strong> Auf Zeile tippen für Details
              </div>
            </div>
          ) : (
            <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4 mb-1">
              <h2 className="text-sm sm:text-base font-semibold">Patienten ({filteredPatienten.length}) • Betten ({allBeds.length})</h2>
            </div>
            {allBeds.map(p => (
              <div key={p.id} onClick={() => handlePatientClick(p)} className={`rounded-lg shadow border-l-4 relative active:scale-98 transition-transform ${p.prioritaet === 'leer' ? (gesperrteBetten[p.id] ? 'bg-red-100 border-red-400' : 'bg-gray-100 border-gray-300') : 'cursor-pointer active:shadow-lg ' + priorityColors[p.prioritaet]} ${selectedPatient?.id === p.id ? 'ring-2 ring-blue-500' : ''}`}>
                {p.prioritaet !== 'leer' && shouldShowBlinklicht(p.id) && (
                  <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse-red"></div>
                )}
                {p.prioritaet !== 'leer' && shouldShowMedBlinklicht(p.id) && (
                  <div className="absolute top-1 right-5 w-2.5 h-2.5 bg-green-600 rounded-full animate-pulse-red"></div>
                )}
                <div className="p-2">
                  {p.prioritaet === 'leer' ? (
                    <div className="text-center py-1.5">
                      <div className="flex items-center justify-center gap-1.5 mb-1.5">
                        <span className="font-bold text-xs text-gray-500">{p.zimmer}</span>
                        <span className={`text-xs ${gesperrteBetten[p.id] ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>
                          {gesperrteBetten[p.id] ? '🚫 Gesperrt' : '🛏️ Frei'}
                        </span>
                      </div>
                      {gesperrteBetten[p.id] ? (
                        <>
                          <div className="text-xs text-red-700 mb-1.5 px-1.5 py-1 bg-red-50 rounded">
                            {gesperrteBetten[p.id]}
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBettSperre(p.id);
                            }}
                            className="px-2.5 py-1 text-xs rounded bg-green-600 text-white active:bg-green-700"
                          >
                            Freigeben
                          </button>
                        </>
                      ) : (
                        <div onClick={(e) => e.stopPropagation()}>
                          <input
                            type="text"
                            placeholder="Sperrgrund..."
                            value={sperrgrundInput[p.id] || ''}
                            onChange={(e) => setSperrgrundInput(prev => ({ ...prev, [p.id]: e.target.value }))}
                            className="w-full text-xs px-2 py-1 border border-gray-300 rounded mb-1"
                          />
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              if (sperrgrundInput[p.id]?.trim()) {
                                toggleBettSperre(p.id, sperrgrundInput[p.id]);
                              }
                            }}
                            className="w-full px-2.5 py-1 text-xs rounded bg-red-600 text-white active:bg-red-700 disabled:bg-gray-400"
                            disabled={!sperrgrundInput[p.id]?.trim()}
                          >
                            Sperren
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-0.5 flex-wrap">
                      <div className="font-bold text-xs">{p.zimmer}</div>
                      <span className="text-sm">{p.geschlecht === 'w' ? '♀' : '♂'}</span>
                      {getLiegedauer(p.aufnahme) !== null && (
                        <span className="bg-gray-500 text-white text-xs px-1.5 py-0.5 rounded font-bold">
                          {getLiegedauer(p.aufnahme)}d
                        </span>
                      )}
                      {p.diabetes && <span className="bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded font-bold">DM</span>}
                      {p.cave && <span className="bg-red-600 text-white text-xs px-1 py-0.5 rounded font-bold">⚠</span>}
                      {isNeuaufnahme(p.aufnahme) && <span className="bg-blue-600 text-white text-xs px-1 py-0.5 rounded font-bold">NEU</span>}
                      {isISOPatient(p.diagnose) && <span className="bg-purple-600 text-white text-xs px-1 py-0.5 rounded font-bold">ISO</span>}
                      {getPostOpTage(p.aufnahme, p.diagnose) !== null && (
                        <span className="bg-indigo-600 text-white text-xs px-1.5 py-0.5 rounded font-bold">
                          OP+{getPostOpTage(p.aufnahme, p.diagnose)}
                        </span>
                      )}
                      {p.drainagen > 0 && (
                        <span className="bg-teal-600 text-white text-xs px-1.5 py-0.5 rounded font-bold">
                          DR×{p.drainagen}
                        </span>
                      )}
                      {p.drainageDetails && p.drainageDetails.some(d => d.zug === 'heute') && (
                        <span className="bg-green-600 text-white text-xs px-1.5 py-0.5 rounded font-bold">🔧 ZUG</span>
                      )}
                    </div>
                    <div className={`px-1.5 py-0.5 rounded text-xs font-bold flex-shrink-0 ${p.prioritaet === 'hoch' ? 'bg-red-500 text-white' : p.prioritaet === 'mittel' ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white'}`}>
                      {p.prioritaet === 'hoch' ? 'H' : p.prioritaet === 'mittel' ? 'M' : 'N'}
                    </div>
                  </div>
                  <div className="text-xs font-medium truncate">{p.name}</div>
                  <div className="text-xs text-gray-700 line-clamp-2">{p.diagnose}</div>
                  {p.auffaelligkeiten.length > 0 && (
                    <div className="flex items-center gap-1 text-orange-700 text-xs mt-1">
                      <AlertCircle size={10} />
                      <span>{p.auffaelligkeiten.length} Auff.</span>
                    </div>
                  )}
                  </>
                  )}
                </div>
              </div>
            ))}
          </div>
          </>
          )}

          {selectedPatient && selectedPatient.prioritaet !== 'leer' && (
            <div className="bg-white rounded-lg shadow">
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-t-lg z-10">
                <button 
                  onClick={() => setSelectedPatient(null)}
                  className="float-right bg-white bg-opacity-20 hover:bg-opacity-30 active:bg-opacity-40 rounded-full w-8 h-8 flex items-center justify-center"
                >
                  <span className="text-xl leading-none">×</span>
                </button>
                <h2 className="text-lg sm:text-xl font-bold mb-1 pr-10">{selectedPatient.name}</h2>
                <div className="flex gap-2 text-blue-100 text-xs flex-wrap">
                  <span>Zimmer {selectedPatient.zimmer}</span>
                  <span>•</span>
                  <span>{selectedPatient.alter}J</span>
                  <span>•</span>
                  <span>{formatDatum(selectedPatient.aufnahme)}</span>
                  <span>•</span>
                  <span>{getLiegedauer(selectedPatient.aufnahme)}d</span>
                </div>
              </div>

              <div className="p-3 space-y-3">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                    <FileText size={16} className="text-blue-600" />
                    Diagnose
                  </h3>
                  <div className="bg-blue-50 p-2.5 rounded-lg text-sm">
                    <p>{selectedPatient.diagnose}</p>
                  </div>
                  {selectedPatient.cave && (
                    <div className="mt-2 bg-red-50 border-2 border-red-500 p-2.5 rounded-lg">
                      <div className="flex items-center gap-2 text-red-800 font-bold mb-1 text-sm">
                        <span className="text-lg">⚠</span>
                        <span>CAVE!</span>
                      </div>
                      <p className="text-red-900 font-medium text-sm">{selectedPatient.cave}</p>
                    </div>
                  )}
                  {selectedPatient.diabetes && (
                    <div className="mt-2 bg-orange-100 border-2 border-orange-400 p-2.5 rounded-lg">
                      <div className="flex items-center gap-2 text-orange-800 font-bold text-sm">
                        <span className="text-lg">💉</span>
                        <span>Diabetes mellitus - BZ-Kontrollen</span>
                      </div>
                    </div>
                  )}
                  {getPostOpTage(selectedPatient.aufnahme, selectedPatient.diagnose) !== null && (
                    <div className="mt-2 bg-indigo-100 border-2 border-indigo-400 p-2.5 rounded-lg">
                      <div className="flex items-center gap-2 text-indigo-800 font-bold text-sm">
                        <span className="text-lg">🏥</span>
                        <span>Post-OP Tag {getPostOpTage(selectedPatient.aufnahme, selectedPatient.diagnose)}</span>
                      </div>
                    </div>
                  )}
                  {selectedPatient.drainagen > 0 && selectedPatient.drainageDetails && selectedPatient.drainageDetails.length > 0 && (
                    <div className="mt-2 bg-teal-50 border-2 border-teal-400 p-3 rounded-lg">
                      <div className="flex items-center gap-2 text-teal-800 font-bold mb-2 text-sm">
                        <span className="text-lg">💧</span>
                        <span>Drainagen ({selectedPatient.drainagen})</span>
                      </div>
                      <div className="space-y-2">
                        {selectedPatient.drainageDetails.map((drain, idx) => (
                          <div key={idx} className="bg-white p-2.5 rounded-lg border border-teal-200">
                            <div className="flex items-start justify-between mb-1.5">
                              <div className="font-semibold text-teal-900 text-sm">{drain.typ}</div>
                              <div className="text-xs font-bold text-teal-700">{drain.menge}</div>
                            </div>
                            <div className="text-xs space-y-1 text-gray-700">
                              <div><span className="font-medium">Lage:</span> {drain.lage}</div>
                              <div><span className="font-medium">Sekret:</span> {drain.farbe}</div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-medium">Zug:</span>
                                <span className={`px-1.5 py-0.5 rounded text-xs font-bold ${drain.zug === 'heute' ? 'bg-green-600 text-white' : drain.zug === 'morgen' ? 'bg-blue-600 text-white' : drain.zug === 'übermorgen' ? 'bg-yellow-600 text-white' : 'bg-gray-400 text-white'}`}>
                                  {drain.zug}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold mb-2 flex items-center justify-between text-sm">
                    <span>Vitalwerte</span>
                    <span className="text-xs text-gray-500 font-normal">06:00 Uhr</span>
                  </h3>
                 <div className="grid grid-cols-3 gap-2">
                 <div className={`p-2.5 rounded-lg text-center ${
                   parseFloat(selectedPatient.vitalwerte.temp) > 37.5 || parseFloat(selectedPatient.vitalwerte.temp) < 36.0
                   ? 'bg-red-100 border-2 border-red-500'
                   : 'bg-gray-50'
                   }`}>
                    <div className="text-xs text-gray-600 mb-0.5">Temp</div>
                   <div className={`font-bold text-sm ${
                    parseFloat(selectedPatient.vitalwerte.temp) > 37.5 || parseFloat(selectedPatient.vitalwerte.temp) < 36.0
                     ? 'text-red-700'
                             : ''
                        }`}>{selectedPatient.vitalwerte.temp}°C</div>
                         </div>
                           <div className={`p-2.5 rounded-lg text-center ${
                           parseInt(selectedPatient.vitalwerte.blutdruck.split('/')[0]) > 140 || parseInt(selectedPatient.vitalwerte.blutdruck.split('/')[0]) < 100
                          ? 'bg-red-100 border-2 border-red-500'
                           : 'bg-gray-50'
                            }`}>
                           <div className="text-xs text-gray-600 mb-0.5">RR</div>
                          <div className={`font-bold text-sm ${
                       parseInt(selectedPatient.vitalwerte.blutdruck.split('/')[0]) > 140 || parseInt(selectedPatient.vitalwerte.blutdruck.split('/')[0]) < 100
                        ? 'text-red-700'
                                 : ''
                         }`}>{selectedPatient.vitalwerte.blutdruck}</div>
                        </div>
                    <div className={`p-2.5 rounded-lg text-center ${
                     parseInt(selectedPatient.vitalwerte.puls) > 100 || parseInt(selectedPatient.vitalwerte.puls) < 60
                  ? 'bg-red-100 border-2 border-red-500'
                         : 'bg-gray-50'
                     }`}>
                     <div className="text-xs text-gray-600 mb-0.5">Puls</div>
                      <div className={`font-bold text-sm ${
                       parseInt(selectedPatient.vitalwerte.puls) > 100 || parseInt(selectedPatient.vitalwerte.puls) < 60
                  ? 'text-red-700'
                        : ''
                 }`}>{selectedPatient.vitalwerte.puls}</div>
                 </div>
                        </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                    <Pill size={16} className="text-green-600" />
                    Medikation
                  </h3>
                  <div className="space-y-2">
                    {selectedPatient.medikamente.map((med, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-lg">
                        <input type="checkbox" checked={completedItems[`${selectedPatient.id}-med-${idx}`] || med.verabreicht} onChange={() => toggleCheckbox(selectedPatient.id, 'med', idx)} className="w-4 h-4 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className={`text-sm ${(med.verabreicht || completedItems[`${selectedPatient.id}-med-${idx}`]) ? 'line-through text-gray-500' : ''}`}>{med.name}</div>
                          <div className="text-xs text-gray-600">{med.zeit}</div>
                        </div>
                        {(med.verabreicht || completedItems[`${selectedPatient.id}-med-${idx}`]) && <CheckCircle size={18} className="text-green-600 flex-shrink-0" />}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                    <FileText size={16} className="text-blue-600" />
                    Anordnungen
                  </h3>
                  <div className="space-y-2">
                    {selectedPatient.anordnungen.map((a, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-blue-50 p-2.5 rounded-lg">
                        <input type="checkbox" checked={completedItems[`${selectedPatient.id}-anord-${idx}`] || false} onChange={() => toggleCheckbox(selectedPatient.id, 'anord', idx)} className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div className={`text-sm ${completedItems[`${selectedPatient.id}-anord-${idx}`] ? 'line-through text-gray-500' : ''}`}>{a}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedPatient.auffaelligkeiten.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                      <Bell size={16} className="text-orange-600" />
                      Beobachtungen
                    </h3>
                    <div className="space-y-2">
                      {selectedPatient.auffaelligkeiten.map((a, idx) => (
                        <div key={idx} className="flex items-start gap-2 bg-orange-50 border border-orange-200 p-2.5 rounded-lg">
                          <AlertCircle size={16} className="text-orange-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pb-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                    <FileText size={16} className="text-gray-600" />
                    Notizen (Spickzettel)
                  </h3>
                  <div className="bg-yellow-50 border-2 border-yellow-300 p-3 rounded-lg">
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-yellow-700 text-xs font-medium">📝 Wird nicht gespeichert</span>
                    </div>
                    <textarea
                      value={notizen[selectedPatient.id] || ''}
                      onChange={(e) => updateNotiz(selectedPatient.id, e.target.value)}
                      placeholder="Notizen, Erinnerungen, To-Dos..."
                      className="w-full min-h-24 p-2.5 border border-yellow-300 rounded-lg text-sm resize-y"
                    />
                  </div>
                </div>
              </div>
              
              <div className="p-3 border-t bg-gray-50">
                <button 
                  onClick={() => setSelectedPatient(null)}
                  className="w-full px-6 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg font-medium text-sm"
                >
                  Zurück zur Übersicht
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PflegeDashboard;