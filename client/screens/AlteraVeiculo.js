import {Text, TextInput, TouchableOpacity, View, Alert} from 'react-native'
import React, {useState} from 'react'
import AppLoader from '../configs/loader'
import {SelectList} from 'react-native-dropdown-select-list'
import {useFocusEffect} from '@react-navigation/native'
import {userEmail} from './Login'
import Axios from 'axios'
import {server} from '../configs/server'

export default function AlteraEnderecoScreen({route, navigation}) {
  const [brand, setBrand] = useState('')
  const [color, setColor] = useState('')
  const [model, setModel] = useState('')
  const [plate, setPlate] = useState('')
  const [type, setType] = useState('')
  const [body, setBody] = useState('')
  const [year, setYear] = useState('')
  const [id, setId] = useState('')
  const [loading, setLoading] = useState(false)
  const item = route.params

  const typeOptions = [
    {value: 'Carro', label: 'Carro'},
    {value: 'Moto', label: 'Moto'}
  ]

  const bodyOptions = [
    {value: 'Hatchback', label: 'Hatchback'},
    {value: 'Minivan', label: 'Minivan'},
    {value: 'Perua/SW', label: 'Perua/SW'},
    {value: 'Picape', label: 'Picape'},
    {value: 'Sedã', label: 'Sedã'},
    {value: 'SUV', label: 'SUV'},
    {value: 'Van', label: 'Van'}
  ]

  const colorOptions = [
    {value: 'Amarelo', label: 'Amarelo'},
    {value: 'Azul', label: 'Azul'},
    {value: 'Branco', label: 'Branco'},
    {value: 'Laranja', label: 'Laranja'},
    {value: 'Preto', label: 'Preto'},
    {value: 'Rosa', label: 'Rosa'},
    {value: 'Roxo', label: 'Roxo'},
    {value: 'Verde', label: 'Verde'},
    {value: 'Vermelho', label: 'Vermelho'}
  ]

  const yearOptions = []
  for (let year = 2024; year >= 1920; year--) {
    yearOptions.push({value: year.toString(), label: year.toString()})
  }

  const modelOptions = {
    ACURA: [{value: 'INTEGRA', label: 'INTEGRA'},{value: 'LEGEND', label: 'LEGEND'},{value: 'NSX', label: 'NSX'},],
    AGRALE: [{value: 'MARRUÁ', label: 'MARRUÁ'},],
    'ALFA ROMEO': [{value: '145', label: '145'},{value: '147', label: '147'},{value: '155', label: '155'},{value: '156', label: '156'},{value: '164', label: '164'},{value: '166', label: '166'},{value: '2300', label: '2300'},{value: 'SPIDER', label: 'SPIDER'},],
    'AM GEN': [{value: 'HUMMER', label: 'HUMMER'},],
    'ASIA MOTORS': [{value: 'AM-825', label: 'AM-825'},{value: 'HI-TOPIC', label: 'HI-TOPIC'},{value: 'JIPE', label: 'JIPE'},{value: 'TOPIC', label: 'TOPIC'},{value: 'TOWNER', label: 'TOWNER'},],
    'ASTON MARTIN': [{value: 'DB9', label: 'DB9'},{value: 'DBS', label: 'DBS'},{value: 'DBX', label: 'DBX'},{value: 'DBX707', label: 'DBX707'},{value: 'RAPIDE', label: 'RAPIDE'},{value: 'VANQUISH', label: 'VANQUISH'},{value: 'VANTAGE', label: 'VANTAGE'},{value: 'VIRAGE', label: 'VIRAGE'},],
    AUDI: [{value: '80', label: '80'},{value: '100', label: '100'},{value: 'A1', label: 'A1'},{value: 'A3', label: 'A3'},{value: 'A4', label: 'A4'},{value: 'A5', label: 'A5'},{value: 'A6', label: 'A6'},{value: 'A7', label: 'A7'},{value: 'A8', label: 'A8'},{value: 'ALLROAD', label: 'ALLROAD'},{value: 'AVANT', label: 'AVANT'},{value: 'E-TRON', label: 'E-TRON'},{value: 'Q3', label: 'Q3'},{value: 'Q5', label: 'Q5'},{value: 'Q7', label: 'Q7'},{value: 'Q8', label: 'Q8'},{value: 'R8', label: 'R8'},{value: 'RS', label: 'RS'},{value: 'RS3', label: 'RS3'},{value: 'RS4', label: 'RS4'},{value: 'RS5', label: 'RS5'},{value: 'RS6', label: 'RS6'},{value: 'RS7', label: 'RS7'},{value: 'S', label: 'S'},{value: 'S3', label: 'S3'},{value: 'S4', label: 'S4'},{value: 'S5', label: 'S5'},{value: 'S6', label: 'S6'},{value: 'S7', label: 'S7'},{value: 'S8', label: 'S8'},{value: 'TT', label: 'TT'},{value: 'TTRS', label: 'TTRS'},{value: 'TTS', label: 'TTS'},],
    BABY: [{value: 'BUGGY', label: 'BUGGY'},],
    BMW: [{value: '316', label: '316'},{value: '116IA', label: '116IA'},{value: '118I', label: '118I'},{value: '118IA', label: '118IA'},{value: '118IA/', label: '118IA/'},{value: '120I', label: '120I'},{value: '120IA', label: '120IA'},{value: '125I', label: '125I'},{value: '130I', label: '130I'},{value: '130IA', label: '130IA'},{value: '135IA', label: '135IA'},{value: '218I', label: '218I'},{value: '220I', label: '220I'},{value: '225I', label: '225I'},{value: '316I', label: '316I'},{value: '318I', label: '318I'},{value: '318I/IA', label: '318I/IA'},{value: '318IA', label: '318IA'},{value: '318IS/ISA', label: '318IS/ISA'},{value: '318TI', label: '318TI'},{value: '318TI/TIA', label: '318TI/TIA'},{value: '320I', label: '320I'},{value: '320IA', label: '320IA'},{value: '323CI', label: '323CI'},{value: '323CIA', label: '323CIA'},{value: '323I', label: '323I'},{value: '323I/IA', label: '323I/IA'},{value: '323IA', label: '323IA'},{value: '323TI', label: '323TI'},{value: '323TIA', label: '323TIA'},{value: '325I', label: '325I'},{value: '325I/IA', label: '325I/IA'},{value: '325IA', label: '325IA'},{value: '328I', label: '328I'},{value: '328I/IA', label: '328I/IA'},{value: '328IA', label: '328IA'},{value: '330CI', label: '330CI'},{value: '330CIA', label: '330CIA'},{value: '330E', label: '330E'},{value: '330I', label: '330I'},{value: '330IA', label: '330IA'},{value: '335I', label: '335I'},{value: '335IA', label: '335IA'},{value: '420I', label: '420I'},{value: '428I', label: '428I'},{value: '430I', label: '430I'},{value: '435IA', label: '435IA'},{value: '520I', label: '520I'},{value: '525I/IA', label: '525I/IA'},{value: '528I/IA', label: '528I/IA'},{value: '528IA', label: '528IA'},{value: '530E', label: '530E'},{value: '530I', label: '530I'},{value: '530I/IA', label: '530I/IA'},{value: '535I/IA', label: '535I/IA'},{value: '535IA', label: '535IA'},{value: '540I', label: '540I'},{value: '540I/IA', label: '540I/IA'},{value: '540IA', label: '540IA'},{value: '540ITA', label: '540ITA'},{value: '545IA', label: '545IA'},{value: '550IA', label: '550IA'},{value: '640I', label: '640I'},{value: '645CI', label: '645CI'},{value: '645IA', label: '645IA'},{value: '650CI', label: '650CI'},{value: '650I', label: '650I'},{value: '650IA', label: '650IA'},{value: '730I', label: '730I'},{value: '730IA', label: '730IA'},{value: '735I/IA', label: '735I/IA'},{value: '740I', label: '740I'},{value: '740IA', label: '740IA'},{value: '740IL/ILA', label: '740IL/ILA'},{value: '740ILA', label: '740ILA'},{value: '745IA', label: '745IA'},{value: '745LE', label: '745LE'},{value: '750I', label: '750I'},{value: '750IA', label: '750IA'},{value: '750IL', label: '750IL'},{value: '750ILA', label: '750ILA'},{value: '760IL', label: '760IL'},{value: '840CI', label: '840CI'},{value: '840CIA', label: '840CIA'},{value: '850CI/CIA', label: '850CI/CIA'},{value: '850CSI', label: '850CSI'},{value: '850I', label: '850I'},{value: 'I3', label: 'I3'},{value: 'I4', label: 'I4'},{value: 'I8', label: 'I8'},{value: 'IX', label: 'IX'},{value: 'M', label: 'M'},{value: 'M1', label: 'M1'},{value: 'M140I', label: 'M140I'},{value: 'M2', label: 'M2'},{value: 'M235I', label: 'M235I'},{value: 'M240I', label: 'M240I'},{value: 'M3', label: 'M3'},{value: 'M340I', label: 'M340I'},{value: 'M4', label: 'M4'},{value: 'M440I', label: 'M440I'},{value: 'M5', label: 'M5'},{value: 'M6', label: 'M6'},{value: 'M760LI', label: 'M760LI'},{value: 'M8', label: 'M8'},{value: 'M850I', label: 'M850I'},{value: 'X1', label: 'X1'},{value: 'X2', label: 'X2'},{value: 'X3', label: 'X3'},{value: 'X4', label: 'X4'},{value: 'X5', label: 'X5'},{value: 'X6', label: 'X6'},{value: 'X7', label: 'X7'},{value: 'Z3', label: 'Z3'},{value: 'Z4', label: 'Z4'},{value: 'Z8', label: 'Z8'},],
    BRM: [{value: 'BUGGY', label: 'BUGGY'},{value: 'BUGGY/M-8/M-8', label: 'BUGGY/M-8/M-8'},],
    BUGRE: [{value: 'BUGGY', label: 'BUGGY'},],
    BYD: [{value: 'D1', label: 'D1'},{value: 'ET3', label: 'ET3'},{value: 'HAN', label: 'HAN'},{value: 'SONG', label: 'SONG'},{value: 'TAN', label: 'TAN'},{value: 'YUAN', label: 'YUAN'},],
    'CAB MOTORS': [{value: 'STARK', label: 'STARK'},],
    CADILLAC: [{value: 'DEVILLE/ELDORADO', label: 'DEVILLE/ELDORADO'},{value: 'SEVILLE', label: 'SEVILLE'},],
    CHERY: [{value: 'ARRIZO', label: 'ARRIZO'},{value: 'CELER', label: 'CELER'},{value: 'CIELO', label: 'CIELO'},{value: 'FACE', label: 'FACE'},{value: 'ICAR', label: 'ICAR'},{value: 'QQ', label: 'QQ'},{value: 'S-18', label: 'S-18'},{value: 'TIGGO', label: 'TIGGO'},],
    'CBT JIPE': [{value: 'JAVALI', label: 'JAVALI'},],
    CHANA: [{value: 'CARGO', label: 'CARGO'},{value: 'FAMILY', label: 'FAMILY'},{value: 'UTILITY', label: 'UTILITY'},],
    CHANGAN: [{value: 'MINI', label: 'MINI'},],
    CHEVROLET: [{value: 'A-10', label: 'A-10'},{value: 'A-20', label: 'A-20'},{value: 'AGILE', label: 'AGILE'},{value: 'ASTRA', label: 'ASTRA'},{value: 'BLAZER', label: 'BLAZER'},{value: 'BOLT', label: 'BOLT'},{value: 'BONANZA', label: 'BONANZA'},{value: 'BRASINCA', label: 'BRASINCA'},{value: 'C-10', label: 'C-10'},{value: 'C-20', label: 'C-20'},{value: 'CALIBRA', label: 'CALIBRA'},{value: 'CAMARO', label: 'CAMARO'},{value: 'CAPRICE', label: 'CAPRICE'},{value: 'CAPTIVA', label: 'CAPTIVA'},{value: 'CARAVAN', label: 'CARAVAN'},{value: 'CAVALIER', label: 'CAVALIER'},{value: 'CELTA', label: 'CELTA'},{value: 'CHEVETTE', label: 'CHEVETTE'},{value: 'CHEVY', label: 'CHEVY'},{value: 'CHEYNNE', label: 'CHEYNNE'},{value: 'CLASSIC', label: 'CLASSIC'},{value: 'COBALT', label: 'COBALT'},{value: 'CORSA', label: 'CORSA'},{value: 'CORVETTE', label: 'CORVETTE'},{value: 'CRUZE', label: 'CRUZE'},{value: 'D-10', label: 'D-10'},{value: 'D-20', label: 'D-20'},{value: 'EQUINOX', label: 'EQUINOX'},{value: 'IPANEMA', label: 'IPANEMA'},{value: 'JOY', label: 'JOY'},{value: 'KADETT', label: 'KADETT'},{value: 'LUMINA', label: 'LUMINA'},{value: 'MALIBU', label: 'MALIBU'},{value: 'MARAJO', label: 'MARAJO'},{value: 'MERIVA', label: 'MERIVA'},{value: 'MONTANA', label: 'MONTANA'},{value: 'MONZA', label: 'MONZA'},{value: 'OMEGA', label: 'OMEGA'},{value: 'ONIX', label: 'ONIX'},{value: 'OPALA', label: 'OPALA'},{value: 'PRISMA', label: 'PRISMA'},{value: 'S10', label: 'S10'},{value: 'SATURN', label: 'SATURN'},{value: 'SIERRA', label: 'SIERRA'},{value: 'SILVERADO', label: 'SILVERADO'},{value: 'SONIC', label: 'SONIC'},{value: 'SONOMA', label: 'SONOMA'},{value: 'SPACEVAN', label: 'SPACEVAN'},{value: 'SPIN', label: 'SPIN'},{value: 'SS10', label: 'SS10'},{value: 'SUBURBAN', label: 'SUBURBAN'},{value: 'SUPREMA', label: 'SUPREMA'},{value: 'SYCLONE', label: 'SYCLONE'},{value: 'TIGRA', label: 'TIGRA'},{value: 'TRACKER', label: 'TRACKER'},{value: 'TRAFIC', label: 'TRAFIC'},{value: 'TRAILBLAZER', label: 'TRAILBLAZER'},{value: 'VECTRA', label: 'VECTRA'},{value: 'VERANEIO', label: 'VERANEIO'},{value: 'ZAFIRA', label: 'ZAFIRA'},],
    CHRYSLER: [{value: '300', label: '300'},{value: 'CARAVAN', label: 'CARAVAN'},{value: 'CIRRUS', label: 'CIRRUS'},{value: 'GRAND', label: 'GRAND'},{value: 'LE', label: 'LE'},{value: 'NEON', label: 'NEON'},{value: 'PT', label: 'PT'},{value: 'SEBRING', label: 'SEBRING'},{value: 'STRATUS', label: 'STRATUS'},{value: 'TOWN', label: 'TOWN'},{value: 'VISION', label: 'VISION'},],
    CITROËN: [{value: 'AIRCROSS', label: 'AIRCROSS'},{value: 'AX', label: 'AX'},{value: 'BERLINGO', label: 'BERLINGO'},{value: 'BX', label: 'BX'},{value: 'C3', label: 'C3'},{value: 'C4', label: 'C4'},{value: 'C5', label: 'C5'},{value: 'C6', label: 'C6'},{value: 'C8', label: 'C8'},{value: 'DS3', label: 'DS3'},{value: 'DS4', label: 'DS4'},{value: 'DS5', label: 'DS5'},{value: 'Ë-JUMPY', label: 'Ë-JUMPY'},{value: 'EVASION', label: 'EVASION'},{value: 'GRAND', label: 'GRAND'},{value: 'JUMPER', label: 'JUMPER'},{value: 'JUMPY', label: 'JUMPY'},{value: 'XANTIA', label: 'XANTIA'},{value: 'XM', label: 'XM'},{value: 'XSARA', label: 'XSARA'},{value: 'ZX', label: 'ZX'},],
    'CROSS LANDER': [{value: 'CL-244', label: 'CL-244'},{value: 'CL-330', label: 'CL-330'},],
    D2D: [{value: 'BUGGY', label: 'BUGGY'},],
    DAEWOO: [{value: 'ESPERO', label: 'ESPERO'},{value: 'LANOS', label: 'LANOS'},{value: 'LEGANZA', label: 'LEGANZA'},{value: 'NUBIRA', label: 'NUBIRA'},{value: 'PRINCE', label: 'PRINCE'},{value: 'RACER', label: 'RACER'},{value: 'SUPER', label: 'SUPER'},{value: 'TICO', label: 'TICO'},],
    DAIHATSU: [{value: 'APPLAUSE', label: 'APPLAUSE'},{value: 'CHARADE', label: 'CHARADE'},{value: 'CUORE', label: 'CUORE'},{value: 'FEROZA', label: 'FEROZA'},{value: 'GRAN', label: 'GRAN'},{value: 'MOVE', label: 'MOVE'},{value: 'TERIOS', label: 'TERIOS'},],
    DODGE: [{value: 'AVENGER', label: 'AVENGER'},{value: 'DAKOTA', label: 'DAKOTA'},{value: 'DURANGO', label: 'DURANGO'},{value: 'INTREPID', label: 'INTREPID'},{value: 'JOURNEY', label: 'JOURNEY'},{value: 'RAM', label: 'RAM'},{value: 'STEALTH', label: 'STEALTH'},],
    EFFA: [{value: 'K01', label: 'K01'},{value: 'K02', label: 'K02'},{value: 'M-100', label: 'M-100'},{value: 'PLUTUS', label: 'PLUTUS'},{value: 'START', label: 'START'},{value: 'ULC', label: 'ULC'},{value: 'V21', label: 'V21'},{value: 'V22', label: 'V22'},{value: 'V25', label: 'V25'},],
    ENGESA: [{value: 'ENGESA', label: 'ENGESA'},],
    ENVEMO: [{value: 'CAMPER', label: 'CAMPER'},{value: 'MASTER', label: 'MASTER'},],
    FERRARI: [{value: '296', label: '296'},{value: '348', label: '348'},{value: '355', label: '355'},{value: '360', label: '360'},{value: '456', label: '456'},{value: '458', label: '458'},{value: '488', label: '488'},{value: '550', label: '550'},{value: '612', label: '612'},{value: '812', label: '812'},{value: '575M', label: '575M'},{value: 'CALIFORNIA', label: 'CALIFORNIA'},{value: 'F12', label: 'F12'},{value: 'F430', label: 'F430'},{value: 'F458', label: 'F458'},{value: 'F599', label: 'F599'},{value: 'F8', label: 'F8'},{value: 'FF', label: 'FF'},{value: 'GTC4', label: 'GTC4'},{value: 'PORTOFINO', label: 'PORTOFINO'},{value: 'ROMA', label: 'ROMA'},{value: 'SF', label: 'SF'},],
    FIAT: [{value: '147', label: '147'},{value: '500', label: '500'},{value: '500E', label: '500E'},{value: 'ARGO', label: 'ARGO'},{value: 'BRAVA', label: 'BRAVA'},{value: 'BRAVO', label: 'BRAVO'},{value: 'CINQUECENTO', label: 'CINQUECENTO'},{value: 'COUPE', label: 'COUPE'},{value: 'CRONOS', label: 'CRONOS'},{value: 'DOBLO', label: 'DOBLO'},{value: 'DUCATO', label: 'DUCATO'},{value: 'DUCATO-10', label: 'DUCATO-10'},{value: 'DUCATO-15', label: 'DUCATO-15'},{value: 'DUCATO-8', label: 'DUCATO-8'},{value: 'DUNA', label: 'DUNA'},{value: 'ELBA', label: 'ELBA'},{value: 'E-SCUDO', label: 'E-SCUDO'},{value: 'FASTBACK', label: 'FASTBACK'},{value: 'FIORINO', label: 'FIORINO'},{value: 'FREEMONT', label: 'FREEMONT'},{value: 'GRAND', label: 'GRAND'},{value: 'IDEA', label: 'IDEA'},{value: 'LINEA', label: 'LINEA'},{value: 'MAREA', label: 'MAREA'},{value: 'MOBI', label: 'MOBI'},{value: 'OGGI', label: 'OGGI'},{value: 'PALIO', label: 'PALIO'},{value: 'PANORAMA', label: 'PANORAMA'},{value: 'PREMIO', label: 'PREMIO'},{value: 'PULSE', label: 'PULSE'},{value: 'PUNTO', label: 'PUNTO'},{value: 'SCUDO', label: 'SCUDO'},{value: 'SIENA', label: 'SIENA'},{value: 'STILO', label: 'STILO'},{value: 'STRADA', label: 'STRADA'},{value: 'STRADA/', label: 'STRADA/'},{value: 'TEMPRA', label: 'TEMPRA'},{value: 'TIPO', label: 'TIPO'},{value: 'TORO', label: 'TORO'},{value: 'UNO', label: 'UNO'},],
    FIBRAVAN: [{value: 'BUGGY', label: 'BUGGY'},],
    FORD: [{value: 'AEROSTAR', label: 'AEROSTAR'},{value: 'ASPIRE', label: 'ASPIRE'},{value: 'BELINA', label: 'BELINA'},{value: 'BRONCO', label: 'BRONCO'},{value: 'CLUB', label: 'CLUB'},{value: 'CONTOUR', label: 'CONTOUR'},{value: 'CORCEL', label: 'CORCEL'},{value: 'COURIER', label: 'COURIER'},{value: 'CROWN', label: 'CROWN'},{value: 'DEL', label: 'DEL'},{value: 'ECOSPORT', label: 'ECOSPORT'},{value: 'EDGE', label: 'EDGE'},{value: 'ESCORT', label: 'ESCORT'},{value: 'EXPEDITION', label: 'EXPEDITION'},{value: 'EXPLORER', label: 'EXPLORER'},{value: 'F-100', label: 'F-100'},{value: 'F-1000', label: 'F-1000'},{value: 'F-150', label: 'F-150'},{value: 'F-250', label: 'F-250'},{value: 'FIESTA', label: 'FIESTA'},{value: 'FOCUS', label: 'FOCUS'},{value: 'FURGLAINE', label: 'FURGLAINE'},{value: 'FUSION', label: 'FUSION'},{value: 'IBIZA', label: 'IBIZA'},{value: 'KA', label: 'KA'},{value: 'KA+', label: 'KA+'},{value: 'MAVERICK', label: 'MAVERICK'},{value: 'MONDEO', label: 'MONDEO'},{value: 'MUSTANG', label: 'MUSTANG'},{value: 'PAMPA', label: 'PAMPA'},{value: 'PROBE', label: 'PROBE'},{value: 'RANGER', label: 'RANGER'},{value: 'ROYALE', label: 'ROYALE'},{value: 'TAURUS', label: 'TAURUS'},{value: 'TERRITORY', label: 'TERRITORY'},{value: 'THUNDERBIRD', label: 'THUNDERBIRD'},{value: 'TRANSIT', label: 'TRANSIT'},{value: 'VERONA', label: 'VERONA'},{value: 'VERSAILLES', label: 'VERSAILLES'},{value: 'WINDSTAR', label: 'WINDSTAR'},],
    FOTON: [{value: 'AUMARK', label: 'AUMARK'},{value: 'MINITRUCK', label: 'MINITRUCK'},],
    FYBER: [{value: 'BUGGY', label: 'BUGGY'},],
    GEELY: [{value: 'EC7', label: 'EC7'},{value: 'GC2', label: 'GC2'},],
    'GREAT WALL': [{value: 'HOVER', label: 'HOVER'},],
    GURGEL: [{value: 'BR-800', label: 'BR-800'},{value: 'CARAJAS', label: 'CARAJAS'},{value: 'CARAJAS/TOCANTIS/XAVANTE/VIP', label: 'CARAJAS/TOCANTIS/XAVANTE/VIP'},],
    GWM: [{value: 'HAVAL', label: 'HAVAL'},],
    HAFEI: [{value: 'TOWNER', label: 'TOWNER'},],
    'HITECH ELECTRIC': [{value: 'E.CO', label: 'E.CO'},],
    HONDA: [{value: 'ACCORD', label: 'ACCORD'},{value: 'CITY', label: 'CITY'},{value: 'CIVIC', label: 'CIVIC'},{value: 'CR-V', label: 'CR-V'},{value: 'FIT', label: 'FIT'},{value: 'HR-V', label: 'HR-V'},{value: 'ODYSSEY', label: 'ODYSSEY'},{value: 'PASSPORT', label: 'PASSPORT'},{value: 'PRELUDE', label: 'PRELUDE'},{value: 'WR-V', label: 'WR-V'},],
    HYUNDAI: [{value: 'ACCENT', label: 'ACCENT'},{value: 'ATOS', label: 'ATOS'},{value: 'AZERA', label: 'AZERA'},{value: 'COUPE', label: 'COUPE'},{value: 'CRETA', label: 'CRETA'},{value: 'CUPÊ', label: 'CUPÊ'},{value: 'ELANTRA', label: 'ELANTRA'},{value: 'EQUUS', label: 'EQUUS'},{value: 'EXCEL', label: 'EXCEL'},{value: 'GALLOPER', label: 'GALLOPER'},{value: 'GENESIS', label: 'GENESIS'},{value: 'GRAND', label: 'GRAND'},{value: 'H1', label: 'H1'},{value: 'H100', label: 'H100'},{value: 'HB20', label: 'HB20'},{value: 'HB20S', label: 'HB20S'},{value: 'HB20X', label: 'HB20X'},{value: 'HR', label: 'HR'},{value: 'I30', label: 'I30'},{value: 'I30CW', label: 'I30CW'},{value: 'IONIQ', label: 'IONIQ'},{value: 'IX35', label: 'IX35'},{value: 'MATRIX', label: 'MATRIX'},{value: 'PORTER', label: 'PORTER'},{value: 'SANTA FÉ', label: 'SANTA FÉ'},{value: 'SCOUPE', label: 'SCOUPE'},{value: 'SONATA', label: 'SONATA'},{value: 'TERRACAN', label: 'TERRACAN'},{value: 'TRAJET', label: 'TRAJET'},{value: 'TUCSON', label: 'TUCSON'},{value: 'VELOSTER', label: 'VELOSTER'},{value: 'VERACRUZ', label: 'VERACRUZ'},],
    ISUZU: [{value: 'AMIGO', label: 'AMIGO'},{value: 'HOMBRE', label: 'HOMBRE'},{value: 'RODEO', label: 'RODEO'},],
    IVECO: [{value: 'DAILY', label: 'DAILY'},],
    JAC: [{value: 'E-J7', label: 'E-J7'},{value: 'E-JS1', label: 'E-JS1'},{value: 'E-JS4', label: 'E-JS4'},{value: 'E-JV5.5', label: 'E-JV5.5'},{value: 'IEV', label: 'IEV'},{value: 'J2', label: 'J2'},{value: 'J3', label: 'J3'},{value: 'J5', label: 'J5'},{value: 'J6', label: 'J6'},{value: 'T', label: 'T'},{value: 'T40', label: 'T40'},{value: 'T5', label: 'T5'},{value: 'T50', label: 'T50'},{value: 'T6', label: 'T6'},{value: 'T60', label: 'T60'},{value: 'T8', label: 'T8'},{value: 'T80', label: 'T80'},{value: 'V260', label: 'V260'},],
    JAGUAR: [{value: 'DAIMLER', label: 'DAIMLER'},{value: 'E-PACE', label: 'E-PACE'},{value: 'F-PACE', label: 'F-PACE'},{value: 'F-TYPE', label: 'F-TYPE'},{value: 'I-PACE', label: 'I-PACE'},{value: 'S-TYPE', label: 'S-TYPE'},{value: 'XE', label: 'XE'},{value: 'XF', label: 'XF'},{value: 'XFR', label: 'XFR'},{value: 'XFR-S', label: 'XFR-S'},{value: 'XJ', label: 'XJ'},{value: 'XJ-12', label: 'XJ-12'},{value: 'XJ-6', label: 'XJ-6'},{value: 'XJ-8', label: 'XJ-8'},{value: 'XJR', label: 'XJR'},{value: 'XJS', label: 'XJS'},{value: 'XJS-C', label: 'XJS-C'},{value: 'XK-8', label: 'XK-8'},{value: 'XKR', label: 'XKR'},{value: 'XKR-S', label: 'XKR-S'},{value: 'X-TYPE', label: 'X-TYPE'},],
    JEEP: [{value: 'CHEROKEE', label: 'CHEROKEE'},{value: 'COMMANDER', label: 'COMMANDER'},{value: 'COMPASS', label: 'COMPASS'},{value: 'GLADIATOR', label: 'GLADIATOR'},{value: 'GRAND', label: 'GRAND'},{value: 'RENEGADE', label: 'RENEGADE'},{value: 'RENEGADE1.8', label: 'RENEGADE1.8'},{value: 'WRANGLER', label: 'WRANGLER'},],
    JINBEI: [{value: 'TOPIC', label: 'TOPIC'},{value: 'VKN', label: 'VKN'},],
    JPX: [{value: 'JIPE', label: 'JIPE'},{value: 'PICAPE', label: 'PICAPE'},],
    'KIA MOTORS': [{value: 'BESTA', label: 'BESTA'},{value: 'BONGO', label: 'BONGO'},{value: 'CADENZA', label: 'CADENZA'},{value: 'CARENS', label: 'CARENS'},{value: 'CARNIVAL', label: 'CARNIVAL'},{value: 'CERATO', label: 'CERATO'},{value: 'CERES', label: 'CERES'},{value: 'CLARUS', label: 'CLARUS'},{value: 'GRAND', label: 'GRAND'},{value: 'MAGENTIS', label: 'MAGENTIS'},{value: 'MOHAVE', label: 'MOHAVE'},{value: 'NIRO', label: 'NIRO'},{value: 'OPIRUS', label: 'OPIRUS'},{value: 'OPTIMA', label: 'OPTIMA'},{value: 'PICANTO', label: 'PICANTO'},{value: 'QUORIS', label: 'QUORIS'},{value: 'RIO', label: 'RIO'},{value: 'SEPHIA', label: 'SEPHIA'},{value: 'SHUMA', label: 'SHUMA'},{value: 'SORENTO', label: 'SORENTO'},{value: 'SOUL', label: 'SOUL'},{value: 'SPORTAGE', label: 'SPORTAGE'},{value: 'STINGER', label: 'STINGER'},{value: 'STONIC', label: 'STONIC'},],
    LADA: [{value: 'LAIKA', label: 'LAIKA'},{value: 'NIVA', label: 'NIVA'},{value: 'SAMARA', label: 'SAMARA'},],
    LAMBORGHINI: [{value: 'AVENTADOR', label: 'AVENTADOR'},{value: 'GALLARDO', label: 'GALLARDO'},{value: 'HURACAN', label: 'HURACAN'},{value: 'URUS', label: 'URUS'},],
    'LAND ROVER': [{value: 'DEFE.', label: 'DEFE.'},{value: 'DEFENDER', label: 'DEFENDER'},{value: 'DISC.', label: 'DISC.'},{value: 'DISCOV.', label: 'DISCOV.'},{value: 'DISCOVERY', label: 'DISCOVERY'},{value: 'DISCOVERY3', label: 'DISCOVERY3'},{value: 'DISCOVERY4', label: 'DISCOVERY4'},{value: 'FREELANDER', label: 'FREELANDER'},{value: 'FREELANDER2', label: 'FREELANDER2'},{value: 'NEW', label: 'NEW'},{value: 'RANGE', label: 'RANGE'},{value: 'RANGE.R.', label: 'RANGE.R.'},],
    LEXUS: [{value: 'CT200H', label: 'CT200H'},{value: 'ES-300', label: 'ES-300'},{value: 'ES300H', label: 'ES300H'},{value: 'ES-330', label: 'ES-330'},{value: 'ES-350', label: 'ES-350'},{value: 'GS', label: 'GS'},{value: 'IS-250', label: 'IS-250'},{value: 'IS-300', label: 'IS-300'},{value: 'LS', label: 'LS'},{value: 'LS-460L', label: 'LS-460L'},{value: 'NX-200T', label: 'NX-200T'},{value: 'NX-300', label: 'NX-300'},{value: 'NX-300H', label: 'NX-300H'},{value: 'NX-350H', label: 'NX-350H'},{value: 'RX', label: 'RX'},{value: 'RX-350', label: 'RX-350'},{value: 'RX-450H', label: 'RX-450H'},{value: 'RX-500H', label: 'RX-500H'},{value: 'SC', label: 'SC'},{value: 'UX-250H', label: 'UX-250H'},],
    LIFAN: [{value: '320', label: '320'},{value: '530', label: '530'},{value: '620', label: '620'},{value: 'FOISON', label: 'FOISON'},{value: 'X60', label: 'X60'},{value: 'X80', label: 'X80'},],
    LOBINI: [{value: 'H1', label: 'H1'},],
    LOTUS: [{value: 'ELAN', label: 'ELAN'},{value: 'ESPRIT', label: 'ESPRIT'},],
    MAHINDRA: [{value: 'PIK-UP', label: 'PIK-UP'},{value: 'SCORPIO', label: 'SCORPIO'},{value: 'SUV', label: 'SUV'},],
    MASERATI: [{value: '222', label: '222'},{value: '228', label: '228'},{value: '430', label: '430'},{value: '3200', label: '3200'},{value: 'COUPÉ', label: 'COUPÉ'},{value: 'GHIBLI', label: 'GHIBLI'},{value: 'GRAN', label: 'GRAN'},{value: 'GRANCABRIO', label: 'GRANCABRIO'},{value: 'GRANSPORT', label: 'GRANSPORT'},{value: 'GRANTURISMO', label: 'GRANTURISMO'},{value: 'LEVANTE', label: 'LEVANTE'},{value: 'QUATTROPORTE', label: 'QUATTROPORTE'},{value: 'SHAMAL', label: 'SHAMAL'},{value: 'SPYDER', label: 'SPYDER'},],
    MATRA: [{value: 'PICK-UP', label: 'PICK-UP'},],
    MAZDA: [{value: '323', label: '323'},{value: '626', label: '626'},{value: '929', label: '929'},{value: 'B2200', label: 'B2200'},{value: 'B-2500', label: 'B-2500'},{value: 'MILLENIA', label: 'MILLENIA'},{value: 'MPV', label: 'MPV'},{value: 'MX-3', label: 'MX-3'},{value: 'MX-5', label: 'MX-5'},{value: 'NAVAJO', label: 'NAVAJO'},{value: 'PROTEGÉ', label: 'PROTEGÉ'},{value: 'RX', label: 'RX'},],
    MCLAREN: [{value: '540C', label: '540C'},{value: '570S', label: '570S'},{value: '600LT', label: '600LT'},{value: '720S', label: '720S'},{value: '765LT', label: '765LT'},{value: 'ARTURA', label: 'ARTURA'},{value: 'GT', label: 'GT'},],
    'MERCEDES-BENZ': [{value: '180-D', label: '180-D'},{value: '190-E', label: '190-E'},{value: '230-E', label: '230-E'},{value: '260-E', label: '260-E'},{value: '300-D', label: '300-D'},{value: '300-E', label: '300-E'},{value: '300-SE', label: '300-SE'},{value: '300-SL', label: '300-SL'},{value: '300-TE', label: '300-TE'},{value: '500-E', label: '500-E'},{value: '500-SEC/', label: '500-SEC/'},{value: '500-SEL', label: '500-SEL'},{value: '560-SEL', label: '560-SEL'},{value: 'A 200', label: 'A 200'},{value: 'A 250', label: 'A 250'},{value: 'A35', label: 'A35'},{value: 'A-35', label: 'A-35'},{value: 'A-45', label: 'A-45'},{value: 'C-180', label: 'C-180'},{value: 'C-200', label: 'C-200'},{value: 'C-220', label: 'C-220'},{value: 'C-230', label: 'C-230'},{value: 'C-240', label: 'C-240'},{value: 'C-250', label: 'C-250'},{value: 'C-280', label: 'C-280'},{value: 'C-300', label: 'C-300'},{value: 'C-320', label: 'C-320'},{value: 'C-350', label: 'C-350'},{value: 'C-36', label: 'C-36'},{value: 'C-43', label: 'C-43'},{value: 'C-450', label: 'C-450'},{value: 'C-55', label: 'C-55'},{value: 'C-63', label: 'C-63'},{value: 'CL-500', label: 'CL-500'},{value: 'CL-600', label: 'CL-600'},{value: 'CL-63', label: 'CL-63'},{value: 'CL-65', label: 'CL-65'},{value: 'CLA-180', label: 'CLA-180'},{value: 'CLA-200', label: 'CLA-200'},{value: 'CLA-250', label: 'CLA-250'},{value: 'CLA-35', label: 'CLA-35'},{value: 'CLA-45', label: 'CLA-45'},{value: 'CLASSE A 160', label: 'CLASSE A 160'},{value: 'CLASSE A 190', label: 'CLASSE A 190'},{value: 'CLASSE A 200', label: 'CLASSE A 200'},{value: 'CLASSE A 250', label: 'CLASSE A 250'},{value: 'CLASSE A45', label: 'CLASSE A45'},{value: 'CLASSE B 170', label: 'CLASSE B 170'},{value: 'CLASSE B 180', label: 'CLASSE B 180'},{value: 'CLASSE B 200', label: 'CLASSE B 200'},{value: 'CLASSE R 500', label: 'CLASSE R 500'},{value: 'CLASSIC', label: 'CLASSIC'},{value: 'CLC', label: 'CLC'},{value: 'CLK-230', label: 'CLK-230'},{value: 'CLK-320', label: 'CLK-320'},{value: 'CLK-350', label: 'CLK-350'},{value: 'CLK-430', label: 'CLK-430'},{value: 'CLK-500', label: 'CLK-500'},{value: 'CLK-55', label: 'CLK-55'},{value: 'CLS-350', label: 'CLS-350'},{value: 'CLS-400', label: 'CLS-400'},{value: 'CLS-450', label: 'CLS-450'},{value: 'CLS-500', label: 'CLS-500'},{value: 'CLS-53', label: 'CLS-53'},{value: 'CLS-55', label: 'CLS-55'},{value: 'CLS-63', label: 'CLS-63'},{value: 'E-190', label: 'E-190'},{value: 'E-200', label: 'E-200'},{value: 'E-220', label: 'E-220'},{value: 'E-230', label: 'E-230'},{value: 'E-240', label: 'E-240'},{value: 'E-250', label: 'E-250'},{value: 'E-280', label: 'E-280'},{value: 'E-300', label: 'E-300'},{value: 'E-320', label: 'E-320'},{value: 'E-350', label: 'E-350'},{value: 'E-400', label: 'E-400'},{value: 'E-420', label: 'E-420'},{value: 'E-43', label: 'E-43'},{value: 'E-430', label: 'E-430'},{value: 'E-500', label: 'E-500'},{value: 'E-53', label: 'E-53'},{value: 'E-55', label: 'E-55'},{value: 'E-63', label: 'E-63'},{value: 'EQA', label: 'EQA'},{value: 'EQB', label: 'EQB'},{value: 'EQC', label: 'EQC'},{value: 'EQE', label: 'EQE'},{value: 'EQS', label: 'EQS'},{value: 'G-55', label: 'G-55'},{value: 'G-63', label: 'G-63'},{value: 'GL-350', label: 'GL-350'},{value: 'GL-500', label: 'GL-500'},{value: 'GL-63', label: 'GL-63'},{value: 'GLA', label: 'GLA'},{value: 'GLB', label: 'GLB'},{value: 'GLC', label: 'GLC'},{value: 'GLC-300', label: 'GLC-300'},{value: 'GLC-43', label: 'GLC-43'},{value: 'GLC-63', label: 'GLC-63'},{value: 'GLE-350', label: 'GLE-350'},{value: 'GLE-400', label: 'GLE-400'},{value: 'GLE-43', label: 'GLE-43'},{value: 'GLE-450', label: 'GLE-450'},{value: 'GLE-53', label: 'GLE-53'},{value: 'GLE-63', label: 'GLE-63'},{value: 'GLK', label: 'GLK'},{value: 'GLS', label: 'GLS'},{value: 'GLS-350', label: 'GLS-350'},{value: 'GLS-500', label: 'GLS-500'},{value: 'GLS-63', label: 'GLS-63'},{value: 'GT', label: 'GT'},{value: 'ML-230', label: 'ML-230'},{value: 'ML-320', label: 'ML-320'},{value: 'ML-350', label: 'ML-350'},{value: 'ML-430', label: 'ML-430'},{value: 'ML-500', label: 'ML-500'},{value: 'ML-55', label: 'ML-55'},{value: 'ML-63', label: 'ML-63'},{value: 'S-320', label: 'S-320'},{value: 'S-400', label: 'S-400'},{value: 'S-420', label: 'S-420'},{value: 'S-500', label: 'S-500'},{value: 'S-500L', label: 'S-500L'},{value: 'S-55', label: 'S-55'},{value: 'S-560L', label: 'S-560L'},{value: 'S-600', label: 'S-600'},{value: 'S-63', label: 'S-63'},{value: 'S-65', label: 'S-65'},{value: 'SE-500', label: 'SE-500'},{value: 'SL-280', label: 'SL-280'},{value: 'SL-320', label: 'SL-320'},{value: 'SL-350', label: 'SL-350'},{value: 'SL-400', label: 'SL-400'},{value: 'SL-500', label: 'SL-500'},{value: 'SL-55', label: 'SL-55'},{value: 'SL-600', label: 'SL-600'},{value: 'SL-63', label: 'SL-63'},{value: 'SL-65', label: 'SL-65'},{value: 'SLC-300', label: 'SLC-300'},{value: 'SLC-43', label: 'SLC-43'},{value: 'SLK-200', label: 'SLK-200'},{value: 'SLK-230', label: 'SLK-230'},{value: 'SLK-250', label: 'SLK-250'},{value: 'SLK-300', label: 'SLK-300'},{value: 'SLK-320', label: 'SLK-320'},{value: 'SLK-350', label: 'SLK-350'},{value: 'SLK-55', label: 'SLK-55'},{value: 'SLS-63', label: 'SLS-63'},{value: 'SPRI.', label: 'SPRI.'},{value: 'SPRIN.', label: 'SPRIN.'},{value: 'SPRINTER', label: 'SPRINTER'},{value: 'VITO', label: 'VITO'},],
    MERCURY: [{value: 'MYSTIQUE', label: 'MYSTIQUE'},{value: 'SABLE', label: 'SABLE'},],
    MG: [{value: '550', label: '550'},{value: 'MG6', label: 'MG6'},],
    MINI: [{value: 'COOPER', label: 'COOPER'},{value: 'ONE', label: 'ONE'},],
    MITSUBISHI: [{value: '3000', label: '3000'},{value: 'AIRTREK', label: 'AIRTREK'},{value: 'ASX', label: 'ASX'},{value: 'ASX-S', label: 'ASX-S'},{value: 'COLT', label: 'COLT'},{value: 'DIAMANT', label: 'DIAMANT'},{value: 'ECLIPSE', label: 'ECLIPSE'},{value: 'EXPO', label: 'EXPO'},{value: 'GALANT', label: 'GALANT'},{value: 'GRANDIS', label: 'GRANDIS'},{value: 'L200', label: 'L200'},{value: 'L300', label: 'L300'},{value: 'LANCER', label: 'LANCER'},{value: 'MIRAGE', label: 'MIRAGE'},{value: 'MONTERO', label: 'MONTERO'},{value: 'OUTLANDER', label: 'OUTLANDER'},{value: 'PAJERO', label: 'PAJERO'},{value: 'SPACE', label: 'SPACE'},],
    MIURA: [{value: 'PICAPE', label: 'PICAPE'},],
    NISSAN: [{value: '350Z', label: '350Z'},{value: 'ALTIMA', label: 'ALTIMA'},{value: 'AX', label: 'AX'},{value: 'D-21', label: 'D-21'},{value: 'FRONTIER', label: 'FRONTIER'},{value: 'GT-R', label: 'GT-R'},{value: 'INFINIT', label: 'INFINIT'},{value: 'KICKS', label: 'KICKS'},{value: 'KING-CAB', label: 'KING-CAB'},{value: 'LEAF', label: 'LEAF'},{value: 'LIVINA', label: 'LIVINA'},{value: 'MARCH', label: 'MARCH'},{value: 'MAXIMA', label: 'MAXIMA'},{value: 'MICRA', label: 'MICRA'},{value: 'MURANO', label: 'MURANO'},{value: 'NX', label: 'NX'},{value: 'PATHFINDER', label: 'PATHFINDER'},{value: 'PICK-UP', label: 'PICK-UP'},{value: 'PRIMERA', label: 'PRIMERA'},{value: 'QUEST', label: 'QUEST'},{value: 'SENTRA', label: 'SENTRA'},{value: 'STANZA', label: 'STANZA'},{value: 'SX', label: 'SX'},{value: 'TERRANO', label: 'TERRANO'},{value: 'TIIDA', label: 'TIIDA'},{value: 'VERSA', label: 'VERSA'},{value: 'XTERRA', label: 'XTERRA'},{value: 'X-TRAIL', label: 'X-TRAIL'},{value: 'ZX', label: 'ZX'},],
    PEUGEOT: [{value: '106', label: '106'},{value: '205', label: '205'},{value: '206', label: '206'},{value: '207', label: '207'},{value: '208', label: '208'},{value: '306', label: '306'},{value: '307', label: '307'},{value: '308', label: '308'},{value: '405', label: '405'},{value: '406', label: '406'},{value: '407', label: '407'},{value: '408', label: '408'},{value: '504', label: '504'},{value: '505', label: '505'},{value: '508', label: '508'},{value: '605', label: '605'},{value: '607', label: '607'},{value: '806', label: '806'},{value: '807', label: '807'},{value: '2008', label: '2008'},{value: '3008', label: '3008'},{value: '5008', label: '5008'},{value: 'BOXER', label: 'BOXER'},{value: 'E-2008', label: 'E-2008'},{value: 'E-208', label: 'E-208'},{value: 'E-EXPERT', label: 'E-EXPERT'},{value: 'EXPERT', label: 'EXPERT'},{value: 'HOGGAR', label: 'HOGGAR'},{value: 'PARTNER', label: 'PARTNER'},{value: 'RCZ', label: 'RCZ'},],
    PLYMOUTH: [{value: 'GRAN', label: 'GRAN'},{value: 'SUNDANCE', label: 'SUNDANCE'},],
    PONTIAC: [{value: 'TRANS-AM', label: 'TRANS-AM'},{value: 'TRANS-SPORT', label: 'TRANS-SPORT'},],
    PORSCHE: [{value: '718', label: '718'},{value: '911', label: '911'},{value: '928', label: '928'},{value: '968', label: '968'},{value: 'BOXSTER', label: 'BOXSTER'},{value: 'CAYENNE', label: 'CAYENNE'},{value: 'CAYMAN', label: 'CAYMAN'},{value: 'MACAN', label: 'MACAN'},{value: 'PANAMERA', label: 'PANAMERA'},{value: 'TAYCAN', label: 'TAYCAN'},],
    RAM: [{value: '1500', label: '1500'},{value: '2500', label: '2500'},{value: '3500', label: '3500'},{value: 'CLASSIC', label: 'CLASSIC'},],
    RELY: [{value: 'LINK', label: 'LINK'},{value: 'PICK-UP', label: 'PICK-UP'},{value: 'VAN', label: 'VAN'},],
    RENAULT: [{value: '19', label: '19'},{value: '21', label: '21'},{value: 'CAPTUR', label: 'CAPTUR'},{value: 'CLIO', label: 'CLIO'},{value: 'DUSTER', label: 'DUSTER'},{value: 'EXPRESS', label: 'EXPRESS'},{value: 'FLUENCE', label: 'FLUENCE'},{value: 'KANGOO', label: 'KANGOO'},{value: 'KWID', label: 'KWID'},{value: 'LAGUNA', label: 'LAGUNA'},{value: 'LOGAN', label: 'LOGAN'},{value: 'MASTER', label: 'MASTER'},{value: 'MEGANE', label: 'MEGANE'},{value: 'OROCH', label: 'OROCH'},{value: 'SAFRANE', label: 'SAFRANE'},{value: 'SANDERO', label: 'SANDERO'},{value: 'SCÉNIC', label: 'SCÉNIC'},{value: 'STEPWAY', label: 'STEPWAY'},{value: 'SYMBOL', label: 'SYMBOL'},{value: 'TRAFIC', label: 'TRAFIC'},{value: 'TWINGO', label: 'TWINGO'},{value: 'ZOE', label: 'ZOE'},],
    'ROLLS-ROYCE': [{value: 'CULLINAN', label: 'CULLINAN'},{value: 'DAWN', label: 'DAWN'},{value: 'GHOST', label: 'GHOST'},{value: 'PHANTOM', label: 'PHANTOM'},{value: 'WRAITH', label: 'WRAITH'},],
    ROVER: [{value: 'MINI', label: 'MINI'},],
    SAAB: [{value: '9000', label: '9000'},],
    SATURN: [{value: 'SL-2', label: 'SL-2'},],
    SEAT: [{value: 'CORDOBA', label: 'CORDOBA'},{value: 'IBIZA', label: 'IBIZA'},{value: 'INCA', label: 'INCA'},],
    SHINERAY: [{value: 'SY1020', label: 'SY1020'},{value: 'SY6370', label: 'SY6370'},{value: 'SY6390', label: 'SY6390'},{value: 'X30', label: 'X30'},],
    SMART: [{value: 'FORTWO', label: 'FORTWO'},],
    SSANGYONG: [{value: 'ACTYON', label: 'ACTYON'},{value: 'CHAIRMAN', label: 'CHAIRMAN'},{value: 'ISTANA', label: 'ISTANA'},{value: 'KORANDO', label: 'KORANDO'},{value: 'KYRON', label: 'KYRON'},{value: 'MUSSO', label: 'MUSSO'},{value: 'REXTON', label: 'REXTON'},{value: 'TIVOLI', label: 'TIVOLI'},{value: 'XLV', label: 'XLV'},],
    SUBARU: [{value: 'FORESTER', label: 'FORESTER'},{value: 'IMPREZA', label: 'IMPREZA'},{value: 'LEGACY', label: 'LEGACY'},{value: 'OUTBACK', label: 'OUTBACK'},{value: 'SVX', label: 'SVX'},{value: 'TRIBECA', label: 'TRIBECA'},{value: 'VIVIO', label: 'VIVIO'},{value: 'XV', label: 'XV'},],
    SUZUKI: [{value: 'BALENO', label: 'BALENO'},{value: 'GRAND', label: 'GRAND'},{value: 'IGNIS', label: 'IGNIS'},{value: 'JIMNY', label: 'JIMNY'},{value: 'SAMURAI', label: 'SAMURAI'},{value: 'S-CROSS', label: 'S-CROSS'},{value: 'SIDEKICK', label: 'SIDEKICK'},{value: 'SUPER', label: 'SUPER'},{value: 'SWIFT', label: 'SWIFT'},{value: 'SX4', label: 'SX4'},{value: 'VITARA', label: 'VITARA'},{value: 'WAGON', label: 'WAGON'},],
    TAC: [{value: 'STARK', label: 'STARK'},],
    TOYOTA: [{value: 'AVALON', label: 'AVALON'},{value: 'BAND.', label: 'BAND.'},{value: 'BAND.JIPE', label: 'BAND.JIPE'},{value: 'BAND.PICAPE', label: 'BAND.PICAPE'},{value: 'CAMRY', label: 'CAMRY'},{value: 'CELICA', label: 'CELICA'},{value: 'COROLLA', label: 'COROLLA'},{value: 'CORONA', label: 'CORONA'},{value: 'ETIOS', label: 'ETIOS'},{value: 'HILUX', label: 'HILUX'},{value: 'LAND', label: 'LAND'},{value: 'MR-2', label: 'MR-2'},{value: 'PASEO', label: 'PASEO'},{value: 'PREVIA', label: 'PREVIA'},{value: 'PRIUS', label: 'PRIUS'},{value: 'RAV4', label: 'RAV4'},{value: 'SUPRA', label: 'SUPRA'},{value: 'T-100', label: 'T-100'},{value: 'YARIS', label: 'YARIS'},],
    TROLLER: [{value: 'PANTANAL', label: 'PANTANAL'},{value: 'RF', label: 'RF'},{value: 'T-4', label: 'T-4'},],
    VOLKSWAGEN: [{value: 'AMAROK', label: 'AMAROK'},{value: 'APOLO', label: 'APOLO'},{value: 'BORA', label: 'BORA'},{value: 'CARAVELLE', label: 'CARAVELLE'},{value: 'CORRADO', label: 'CORRADO'},{value: 'CROSSFOX', label: 'CROSSFOX'},{value: 'DELIVERY', label: 'DELIVERY'},{value: 'EOS', label: 'EOS'},{value: 'EUROVAN', label: 'EUROVAN'},{value: 'FOX', label: 'FOX'},{value: 'FUSCA', label: 'FUSCA'},{value: 'GOL', label: 'GOL'},{value: 'GOLF', label: 'GOLF'},{value: 'GRAND', label: 'GRAND'},{value: 'JETTA', label: 'JETTA'},{value: 'KOMBI', label: 'KOMBI'},{value: 'LOGUS', label: 'LOGUS'},{value: 'NEW', label: 'NEW'},{value: 'NIVUS', label: 'NIVUS'},{value: 'PARATI', label: 'PARATI'},{value: 'PASSAT', label: 'PASSAT'},{value: 'POINTER', label: 'POINTER'},{value: 'POLO', label: 'POLO'},{value: 'QUANTUM', label: 'QUANTUM'},{value: 'SANTANA', label: 'SANTANA'},{value: 'SAVEIRO', label: 'SAVEIRO'},{value: 'SPACECROSS', label: 'SPACECROSS'},{value: 'SPACEFOX', label: 'SPACEFOX'},{value: 'TAOS', label: 'TAOS'},{value: 'T-CROSS', label: 'T-CROSS'},{value: 'TIGUAN', label: 'TIGUAN'},{value: 'TOUAREG', label: 'TOUAREG'},{value: 'UP!', label: 'UP!'},{value: 'VAN', label: 'VAN'},{value: 'VIRTUS', label: 'VIRTUS'},{value: 'VOYAGE', label: 'VOYAGE'},],
    VOLVO: [{value: '440', label: '440'},{value: '460', label: '460'},{value: '850', label: '850'},{value: '940', label: '940'},{value: '960', label: '960'},{value: 'C30', label: 'C30'},{value: 'C40', label: 'C40'},{value: 'C70', label: 'C70'},{value: 'S40', label: 'S40'},{value: 'S60', label: 'S60'},{value: 'S70', label: 'S70'},{value: 'S80', label: 'S80'},{value: 'S90', label: 'S90'},{value: 'V40', label: 'V40'},{value: 'V50', label: 'V50'},{value: 'V60', label: 'V60'},{value: 'V70', label: 'V70'},{value: 'XC', label: 'XC'},],
    
    ADLY: [{value: 'ATV', label: 'ATV'},{value: 'JAGUAR', label: 'JAGUAR'},{value: 'RT', label: 'RT'},],
    'AGRALE ': [{value: 'CITY', label: 'CITY'},{value: 'DAKAR', label: 'DAKAR'},{value: 'ELEFANT', label: 'ELEFANT'},{value: 'ELEFANTRE', label: 'ELEFANTRE'},{value: 'FORCE', label: 'FORCE'},{value: 'JUNIOR', label: 'JUNIOR'},{value: 'SST', label: 'SST'},{value: 'SUPER', label: 'SUPER'},{value: 'SXT', label: 'SXT'},{value: 'TCHAU', label: 'TCHAU'},],
    AMAZONAS: [{value: 'AME-110', label: 'AME-110'},{value: 'AME-150', label: 'AME-150'},{value: 'AME-250', label: 'AME-250'},{value: 'AME-LX', label: 'AME-LX'},],
    APRILIA: [{value: 'AREA-51', label: 'AREA-51'},{value: 'CLASSIC', label: 'CLASSIC'},{value: 'LEONARDO', label: 'LEONARDO'},{value: 'MOTO', label: 'MOTO'},{value: 'PEGASO', label: 'PEGASO'},{value: 'RALLY', label: 'RALLY'},{value: 'RS', label: 'RS'},{value: 'RSV', label: 'RSV'},{value: 'RX', label: 'RX'},{value: 'SCARABEO', label: 'SCARABEO'},{value: 'SONIC', label: 'SONIC'},{value: 'SR', label: 'SR'},{value: 'SXR', label: 'SXR'},],
    ATALA: [{value: 'CALIFFONE', label: 'CALIFFONE'},{value: 'MASTER', label: 'MASTER'},{value: 'SKEGIA', label: 'SKEGIA'},],
    AVELLOZ: [{value: 'AZ', label: 'AZ'},],
    BAJAJ: [{value: 'CHAMPION', label: 'CHAMPION'},{value: 'CLASSIC', label: 'CLASSIC'},{value: 'DOMINAR', label: 'DOMINAR'},],
    BEE: [{value: 'BEE', label: 'BEE'},{value: 'MONACO', label: 'MONACO'},],
    BENELLI: [{value: 'TNT', label: 'TNT'},{value: 'TRE', label: 'TRE'},],
    BETA: [{value: 'MX-50', label: 'MX-50'},],
    BIMOTA: [{value: 'DB4', label: 'DB4'},{value: 'DB5R', label: 'DB5R'},{value: 'DB6', label: 'DB6'},{value: 'DB6R', label: 'DB6R'},{value: 'DB7', label: 'DB7'},{value: 'MANTRA', label: 'MANTRA'},{value: 'SBR8', label: 'SBR8'},{value: 'TESI', label: 'TESI'},],
    'BMW ': [{value: 'C 600', label: 'C 600'},{value: 'C 650', label: 'C 650'},{value: 'F', label: 'F'},{value: 'G', label: 'G'},{value: 'K', label: 'K'},{value: 'R', label: 'R'},{value: 'S', label: 'S'},{value: 'S1000', label: 'S1000'},],
    BRANDY: [{value: 'ELEGANT', label: 'ELEGANT'},{value: 'FOSTI', label: 'FOSTI'},{value: 'PISTA', label: 'PISTA'},{value: 'TURBO', label: 'TURBO'},{value: 'ZANELLA', label: 'ZANELLA'},],
    BRAVA: [{value: 'YB', label: 'YB'},],
    BRP: [{value: 'CAN-AM', label: 'CAN-AM'},],
    BUELL: [{value: '1125CR', label: '1125CR'},{value: '1125R', label: '1125R'},{value: 'FIREBOLT', label: 'FIREBOLT'},{value: 'LIGHTNING', label: 'LIGHTNING'},{value: 'ULYSSES', label: 'ULYSSES'},],
    BUENO: [{value: 'JBR', label: 'JBR'},],
    BULL: [{value: 'BM-S', label: 'BM-S'},{value: 'BM-T180', label: 'BM-T180'},{value: 'CAFÉ', label: 'CAFÉ'},{value: 'CICLO', label: 'CICLO'},{value: 'EKO', label: 'EKO'},{value: 'GTR', label: 'GTR'},{value: 'KHRISMA', label: 'KHRISMA'},{value: 'KRC', label: 'KRC'},{value: 'MAXX', label: 'MAXX'},{value: 'NOW', label: 'NOW'},{value: 'SPIRIT', label: 'SPIRIT'},],
    BYCRISTO: [{value: 'TRICICLO', label: 'TRICICLO'},],
    CAGIVA: [{value: 'CANYON', label: 'CANYON'},{value: 'ELEFANT', label: 'ELEFANT'},{value: 'GRAN', label: 'GRAN'},{value: 'MITO', label: 'MITO'},{value: 'NAVIGATOR', label: 'NAVIGATOR'},{value: 'PLANET', label: 'PLANET'},{value: 'ROADSTER', label: 'ROADSTER'},{value: 'V-RAPTOR', label: 'V-RAPTOR'},{value: 'W-16', label: 'W-16'},],
    CALOI: [{value: 'MOBILETE', label: 'MOBILETE'},{value: 'MONDO', label: 'MONDO'},],
    DAELIM: [{value: 'ALTINO', label: 'ALTINO'},{value: 'MESSAGE', label: 'MESSAGE'},{value: 'VC', label: 'VC'},{value: 'VF', label: 'VF'},{value: 'VS', label: 'VS'},{value: 'VT', label: 'VT'},{value: 'VX', label: 'VX'},],
    DAFRA: [{value: 'APACHE', label: 'APACHE'},{value: 'CITYCLASS', label: 'CITYCLASS'},{value: 'CITYCOM', label: 'CITYCOM'},{value: 'CRUISYM', label: 'CRUISYM'},{value: 'FIDDLE', label: 'FIDDLE'},{value: 'HORIZON', label: 'HORIZON'},{value: 'KANSAS', label: 'KANSAS'},{value: 'LASER', label: 'LASER'},{value: 'MAXSYM', label: 'MAXSYM'},{value: 'NEXT', label: 'NEXT'},{value: 'NH', label: 'NH'},{value: 'RIVA', label: 'RIVA'},{value: 'ROADWIN', label: 'ROADWIN'},{value: 'SMART', label: 'SMART'},{value: 'SPEED', label: 'SPEED'},{value: 'SUPER', label: 'SUPER'},{value: 'ZIG', label: 'ZIG'},],
    DAYANG: [{value: 'DY100-31', label: 'DY100-31'},{value: 'DY110-20', label: 'DY110-20'},{value: 'DY125', label: 'DY125'},{value: 'DY125-18', label: 'DY125-18'},{value: 'DY125-36A', label: 'DY125-36A'},{value: 'DY125-37', label: 'DY125-37'},{value: 'DY125-5', label: 'DY125-5'},{value: 'DY125-52', label: 'DY125-52'},{value: 'DY150-12', label: 'DY150-12'},{value: 'DY150-28', label: 'DY150-28'},{value: 'DY150-58', label: 'DY150-58'},{value: 'DY200', label: 'DY200'},{value: 'DY250', label: 'DY250'},{value: 'DY50', label: 'DY50'},{value: 'THOR', label: 'THOR'},],
    DAYUN: [{value: 'DY110-6', label: 'DY110-6'},{value: 'DY125-8', label: 'DY125-8'},{value: 'DY125T-10', label: 'DY125T-10'},{value: 'DY150-7', label: 'DY150-7'},{value: 'DY150-9', label: 'DY150-9'},{value: 'DY150GY', label: 'DY150GY'},{value: 'DY150ZH', label: 'DY150ZH'},{value: 'DY200ZH', label: 'DY200ZH'},{value: 'DY250-2', label: 'DY250-2'},],
    DERBI: [{value: 'ATLANTIS', label: 'ATLANTIS'},{value: 'GPR', label: 'GPR'},{value: 'PREDATOR', label: 'PREDATOR'},{value: 'RED', label: 'RED'},{value: 'REPLICAS', label: 'REPLICAS'},{value: 'SENDA', label: 'SENDA'},],
    DUCATI: [{value: '749', label: '749'},{value: '848', label: '848'},{value: '959', label: '959'},{value: '996', label: '996'},{value: '998', label: '998'},{value: '999', label: '999'},{value: '1098', label: '1098'},{value: '1198', label: '1198'},{value: '1199', label: '1199'},{value: '1299', label: '1299'},{value: '999R', label: '999R'},{value: 'DESMOSEDICI', label: 'DESMOSEDICI'},{value: 'DIAVEL', label: 'DIAVEL'},{value: 'HYPERMOTARD', label: 'HYPERMOTARD'},{value: 'HYPERSTRADA', label: 'HYPERSTRADA'},{value: 'MONSTER', label: 'MONSTER'},{value: 'MULTISTRADA', label: 'MULTISTRADA'},{value: 'PANIGALE', label: 'PANIGALE'},{value: 'SCRAMBLER', label: 'SCRAMBLER'},{value: 'SPORTCLASSIC', label: 'SPORTCLASSIC'},{value: 'SS', label: 'SS'},{value: 'ST-2', label: 'ST-2'},{value: 'ST-4', label: 'ST-4'},{value: 'STREETFIGHTER', label: 'STREETFIGHTER'},{value: 'SUPER', label: 'SUPER'},{value: 'XDIAVEL', label: 'XDIAVEL'},],
    EMME: [{value: 'MIRAGE', label: 'MIRAGE'},{value: 'ONE', label: 'ONE'},],
    FOX: [{value: '150T-3', label: '150T-3'},{value: '250T-10', label: '250T-10'},],
    'FUSCO MOTOSEGURA': [{value: 'CARGA', label: 'CARGA'},],
    FYM: [{value: 'FY100-10A', label: 'FY100-10A'},{value: 'FY125-19', label: 'FY125-19'},{value: 'FY125-20', label: 'FY125-20'},{value: 'FY125EY-2', label: 'FY125EY-2'},{value: 'FY125Y-3', label: 'FY125Y-3'},{value: 'FY150-3', label: 'FY150-3'},{value: 'FY150T-18', label: 'FY150T-18'},{value: 'FY250', label: 'FY250'},],
    GARINNI: [{value: 'GR08T4', label: 'GR08T4'},{value: 'GR125S', label: 'GR125S'},{value: 'GR125ST', label: 'GR125ST'},{value: 'GR125T3', label: 'GR125T3'},{value: 'GR125U', label: 'GR125U'},{value: 'GR125Z', label: 'GR125Z'},{value: 'GR150P/', label: 'GR150P/'},{value: 'GR150ST', label: 'GR150ST'},{value: 'GR150T3/', label: 'GR150T3/'},{value: 'GR150U', label: 'GR150U'},{value: 'GR250T3', label: 'GR250T3'},],
    'GAS GAS': [{value: 'EC', label: 'EC'},{value: 'MC', label: 'MC'},{value: 'PAMPERA', label: 'PAMPERA'},{value: 'TX', label: 'TX'},{value: 'TXT', label: 'TXT'},],
    GREEN: [{value: 'EASY', label: 'EASY'},{value: 'RUNNER', label: 'RUNNER'},{value: 'SAFARI', label: 'SAFARI'},{value: 'SPORT', label: 'SPORT'},],
    HAOBAO: [{value: 'HB', label: 'HB'},{value: 'HB110-3', label: 'HB110-3'},{value: 'HB125-9', label: 'HB125-9'},{value: 'HB150', label: 'HB150'},{value: 'HB150-T', label: 'HB150-T'},],
    HAOJUE: [{value: 'CHOPPER', label: 'CHOPPER'},{value: 'DK', label: 'DK'},{value: 'DR', label: 'DR'},{value: 'LINDY', label: 'LINDY'},{value: 'MASTER', label: 'MASTER'},{value: 'NEX', label: 'NEX'},{value: 'NK', label: 'NK'},{value: 'VR', label: 'VR'},],
    'HARLEY-DAVIDSON': [{value: 'BLACKLINE', label: 'BLACKLINE'},{value: 'BREAKOUT', label: 'BREAKOUT'},{value: 'CVO', label: 'CVO'},{value: 'DEUCE', label: 'DEUCE'},{value: 'DYNA', label: 'DYNA'},{value: 'EG', label: 'EG'},{value: 'ELECTRA', label: 'ELECTRA'},{value: 'FAT', label: 'FAT'},{value: 'FLHTCU', label: 'FLHTCU'},{value: 'FLHTCUI', label: 'FLHTCUI'},{value: 'HERITAGE', label: 'HERITAGE'},{value: 'LOW', label: 'LOW'},{value: 'NIGHT', label: 'NIGHT'},{value: 'NIGHTSTER', label: 'NIGHTSTER'},{value: 'PAN', label: 'PAN'},{value: 'ROAD', label: 'ROAD'},{value: 'SOFTAIL', label: 'SOFTAIL'},{value: 'SPORTSTER', label: 'SPORTSTER'},{value: 'SPRINGER', label: 'SPRINGER'},{value: 'STREET', label: 'STREET'},{value: 'SWITCHBACK', label: 'SWITCHBACK'},{value: 'ULTRA', label: 'ULTRA'},{value: 'V-ROD', label: 'V-ROD'},{value: 'XL', label: 'XL'},{value: 'XR', label: 'XR'},],
    HARTFORD: [{value: 'LEGION', label: 'LEGION'},],
    HERO: [{value: 'ANKUR', label: 'ANKUR'},{value: 'PUCH', label: 'PUCH'},{value: 'STREAM', label: 'STREAM'},],
    'HONDA ': [{value: 'ADV', label: 'ADV'},{value: 'AMERICA', label: 'AMERICA'},{value: 'BIZ', label: 'BIZ'},{value: 'C 100', label: 'C 100'},{value: 'CB', label: 'CB'},{value: 'CB1300', label: 'CB1300'},{value: 'CBR', label: 'CBR'},{value: 'CBX', label: 'CBX'},{value: 'CG', label: 'CG'},{value: 'CH', label: 'CH'},{value: 'CR', label: 'CR'},{value: 'CRF', label: 'CRF'},{value: 'CTX', label: 'CTX'},{value: 'DOMINATOR', label: 'DOMINATOR'},{value: 'ELITE', label: 'ELITE'},{value: 'FORZA', label: 'FORZA'},{value: 'GOLD', label: 'GOLD'},{value: 'LEAD', label: 'LEAD'},{value: 'MAGNA', label: 'MAGNA'},{value: 'NC', label: 'NC'},{value: 'NX', label: 'NX'},{value: 'NX-4', label: 'NX-4'},{value: 'NXR', label: 'NXR'},{value: 'PCX', label: 'PCX'},{value: 'POP', label: 'POP'},{value: 'SH', label: 'SH'},{value: 'SHADOW', label: 'SHADOW'},{value: 'SUPER', label: 'SUPER'},{value: 'TRX', label: 'TRX'},{value: 'VALKYRIE', label: 'VALKYRIE'},{value: 'VFR', label: 'VFR'},{value: 'VT', label: 'VT'},{value: 'VTX', label: 'VTX'},{value: 'X-ADV', label: 'X-ADV'},{value: 'XL', label: 'XL'},{value: 'XLR', label: 'XLR'},{value: 'XLX', label: 'XLX'},{value: 'XR', label: 'XR'},{value: 'XRE', label: 'XRE'},],
    HUSABERG: [{value: 'FE', label: 'FE'},],
    HUSQVARNA: [{value: '701', label: '701'},{value: 'CR', label: 'CR'},{value: 'HUSQY', label: 'HUSQY'},{value: 'NORDEN', label: 'NORDEN'},{value: 'SM', label: 'SM'},{value: 'SMR', label: 'SMR'},{value: 'SVARTPILEN', label: 'SVARTPILEN'},{value: 'TC', label: 'TC'},{value: 'TE', label: 'TE'},{value: 'VITPILEN', label: 'VITPILEN'},{value: 'WR', label: 'WR'},{value: 'WRE', label: 'WRE'},],
    INDIAN: [{value: 'CHIEF', label: 'CHIEF'},{value: 'CHIEFTAIN', label: 'CHIEFTAIN'},{value: 'ROADMASTER', label: 'ROADMASTER'},{value: 'SCOUT', label: 'SCOUT'},],
    IROS: [{value: 'ACTION', label: 'ACTION'},{value: 'BRAVE', label: 'BRAVE'},{value: 'MATRIX', label: 'MATRIX'},{value: 'MOVING', label: 'MOVING'},{value: 'ONE', label: 'ONE'},{value: 'VINTAGE', label: 'VINTAGE'},{value: 'WARRIOR', label: 'WARRIOR'},],
    'JIAPENG VOLCANO': [{value: 'JP', label: 'JP'},],
    JOHNNYPAG: [{value: 'BARHOG', label: 'BARHOG'},{value: 'PROSTREET', label: 'PROSTREET'},{value: 'SPYDER', label: 'SPYDER'},],
    JONNY: [{value: 'ATLANTIC', label: 'ATLANTIC'},{value: 'HYPE', label: 'HYPE'},{value: 'JONNY', label: 'JONNY'},{value: 'MEET', label: 'MEET'},{value: 'NAKED', label: 'NAKED'},{value: 'ORBIT', label: 'ORBIT'},{value: 'PEGASUS', label: 'PEGASUS'},{value: 'QUICK', label: 'QUICK'},{value: 'RACER', label: 'RACER'},{value: 'TEXAS', label: 'TEXAS'},{value: 'TR', label: 'TR'},],
    KAHENA: [{value: '125', label: '125'},{value: '250', label: '250'},],
    KASINSKI: [{value: 'COMET', label: 'COMET'},{value: 'CRUISE', label: 'CRUISE'},{value: 'CRZ', label: 'CRZ'},{value: 'ERO', label: 'ERO'},{value: 'FLASH', label: 'FLASH'},{value: 'FÚRIA', label: 'FÚRIA'},{value: 'GF', label: 'GF'},{value: 'GV', label: 'GV'},{value: 'MAGIK', label: 'MAGIK'},{value: 'MIDAS', label: 'MIDAS'},{value: 'MIRAGE', label: 'MIRAGE'},{value: 'MOTOKAR', label: 'MOTOKAR'},{value: 'PRIMA', label: 'PRIMA'},{value: 'RX', label: 'RX'},{value: 'SETA', label: 'SETA'},{value: 'SOFT', label: 'SOFT'},{value: 'SUPER', label: 'SUPER'},{value: 'TN', label: 'TN'},{value: 'WAY', label: 'WAY'},{value: 'WIN', label: 'WIN'},],
    KAWASAKI: [{value: 'AVAJET', label: 'AVAJET'},{value: 'CONCOURS14', label: 'CONCOURS14'},{value: 'D-TRACKER', label: 'D-TRACKER'},{value: 'ER-5', label: 'ER-5'},{value: 'ER-6N', label: 'ER-6N'},{value: 'KLX', label: 'KLX'},{value: 'KX', label: 'KX'},{value: 'KZ', label: 'KZ'},{value: 'MAXI', label: 'MAXI'},{value: 'NINJA', label: 'NINJA'},{value: 'VERSYS', label: 'VERSYS'},{value: 'VERSYS-X', label: 'VERSYS-X'},{value: 'VOYAGER', label: 'VOYAGER'},{value: 'VULCAN', label: 'VULCAN'},{value: 'Z', label: 'Z'},{value: 'Z-800', label: 'Z-800'},{value: 'Z900', label: 'Z900'},{value: 'ZX-14/ZX', label: 'ZX-14/ZX'},{value: 'ZZR', label: 'ZZR'},],
    KTM: [{value: '690', label: '690'},{value: '1190', label: '1190'},{value: 'ADVENTURE', label: 'ADVENTURE'},{value: 'DUKE', label: 'DUKE'},{value: 'EXC', label: 'EXC'},{value: 'EXC-F', label: 'EXC-F'},{value: 'LC4', label: 'LC4'},{value: 'SC', label: 'SC'},{value: 'SUPER', label: 'SUPER'},{value: 'SUPERDUKE', label: 'SUPERDUKE'},{value: 'SUPERMOTO', label: 'SUPERMOTO'},{value: 'SX', label: 'SX'},{value: 'SXC', label: 'SXC'},],
    KYMCO: [{value: 'AGILITY', label: 'AGILITY'},{value: 'AK', label: 'AK'},{value: 'DJW', label: 'DJW'},{value: 'DOWNTOWN', label: 'DOWNTOWN'},{value: 'M´BOY', label: 'M´BOY'},{value: 'PEOPLE', label: 'PEOPLE'},{value: 'ZING', label: 'ZING'},],
    LANDUM: [{value: 'MOTO', label: 'MOTO'},],
    "L'AQUILA": [{value: 'AKROS', label: 'AKROS'},{value: 'ERGON', label: 'ERGON'},{value: 'NIX', label: 'NIX'},{value: 'PALIO', label: 'PALIO'},],
    LAVRALE: [{value: 'QUATTOR', label: 'QUATTOR'},],
    LERIVO: [{value: 'FORMIGÃO', label: 'FORMIGÃO'},],
    'LIFAN ': [{value: 'CARGO', label: 'CARGO'},],
    'LON-V': [{value: 'DELUXE', label: 'DELUXE'},{value: 'E', label: 'E'},{value: 'LY', label: 'LY'},],
    'MAGRÃO TRICICLOS': [{value: 'MT7', label: 'MT7'},],
    MALAGUTI: [{value: 'CIAK', label: 'CIAK'},{value: 'SPIDER', label: 'SPIDER'},],
    MIZA: [{value: 'DRAGO', label: 'DRAGO'},{value: 'EASY', label: 'EASY'},{value: 'FAST', label: 'FAST'},{value: 'SKEMA', label: 'SKEMA'},{value: 'VITE', label: 'VITE'},],
    'MOTO GUZZI': [{value: 'CALIFORNIA', label: 'CALIFORNIA'},{value: 'QUOTA', label: 'QUOTA'},{value: 'V11', label: 'V11'},],
    MOTOCAR: [{value: 'MCA-200', label: 'MCA-200'},{value: 'MCA-250', label: 'MCA-250'},{value: 'MCF-200', label: 'MCF-200'},{value: 'MCF-250', label: 'MCF-250'},{value: 'MTX-150', label: 'MTX-150'},],
    MOTORINO: [{value: 'BACIO', label: 'BACIO'},{value: 'BELLAVITA', label: 'BELLAVITA'},{value: 'CAPPUCCINO', label: 'CAPPUCCINO'},{value: 'CAPPUCCINO150CC', label: 'CAPPUCCINO150CC'},{value: 'CUSTOM', label: 'CUSTOM'},{value: 'LAMBRETA', label: 'LAMBRETA'},{value: 'STAR', label: 'STAR'},{value: 'VELOCETTE', label: 'VELOCETTE'},{value: 'VELVET', label: 'VELVET'},{value: 'VITESSE', label: 'VITESSE'},{value: 'VOLTI', label: 'VOLTI'},],
    MRX: [{value: '230R', label: '230R'},],
    'MV AGUSTA': [{value: 'BRUTALE', label: 'BRUTALE'},{value: 'F3', label: 'F3'},{value: 'F4', label: 'F4'},{value: 'F4-1000', label: 'F4-1000'},{value: 'RIVALE', label: 'RIVALE'},],
    MVK: [{value: 'BIG', label: 'BIG'},{value: 'BLACK STAR', label: 'BLACK STAR'},{value: 'BRX', label: 'BRX'},{value: 'DUAL', label: 'DUAL'},{value: 'FENIX', label: 'FENIX'},{value: 'FOX', label: 'FOX'},{value: 'GO', label: 'GO'},{value: 'HALLEY', label: 'HALLEY'},{value: 'JURASIC', label: 'JURASIC'},{value: 'MA', label: 'MA'},{value: 'MA/', label: 'MA/'},{value: 'SIMBA', label: 'SIMBA'},{value: 'SPORT', label: 'SPORT'},{value: 'SPYDER', label: 'SPYDER'},{value: 'STREET', label: 'STREET'},{value: 'SUPER', label: 'SUPER'},{value: 'XRT', label: 'XRT'},],
    NIU: [{value: 'NQI', label: 'NQI'},{value: 'UQI', label: 'UQI'},],
    ORCA: [{value: 'AX', label: 'AX'},{value: 'JC', label: 'JC'},{value: 'QM', label: 'QM'},],
    PEGASSI: [{value: 'BR', label: 'BR'},],
    'PEUGEOT ': [{value: 'BUXY', label: 'BUXY'},{value: 'ELYSEO', label: 'ELYSEO'},{value: 'SCOOT', label: 'SCOOT'},{value: 'SPEEDAKE', label: 'SPEEDAKE'},{value: 'SPEEDFIGHT', label: 'SPEEDFIGHT'},{value: 'SQUAB', label: 'SQUAB'},{value: 'TREKKER', label: 'TREKKER'},{value: 'VIVACITY', label: 'VIVACITY'},{value: 'ZENITH', label: 'ZENITH'},],
    PIAGGIO: [{value: 'BERVERLY', label: 'BERVERLY'},{value: 'BEVERLY', label: 'BEVERLY'},{value: 'LIBERTY', label: 'LIBERTY'},{value: 'MP3', label: 'MP3'},{value: 'NRG', label: 'NRG'},{value: 'RUNNER', label: 'RUNNER'},{value: 'VESPA', label: 'VESPA'},{value: 'ZIP', label: 'ZIP'},],
    POLARIS: [{value: 'GENERAL', label: 'GENERAL'},{value: 'RANGER', label: 'RANGER'},{value: 'RZR', label: 'RZR'},{value: 'SPORTSMAN', label: 'SPORTSMAN'},],
    'REGAL RAPTOR': [{value: 'BLACK JACK', label: 'BLACK JACK'},{value: 'FENIX', label: 'FENIX'},{value: 'GHOST', label: 'GHOST'},{value: 'SPYDER', label: 'SPYDER'},],
    RIGUETE: [{value: 'TRC-01', label: 'TRC-01'},],
    'ROYAL ENFIELD': [{value: 'BULLET', label: 'BULLET'},{value: 'CLASSIC', label: 'CLASSIC'},{value: 'CLASSIC/CLASSIC', label: 'CLASSIC/CLASSIC'},{value: 'CONTINENTAL', label: 'CONTINENTAL'},{value: 'HIMALAYAN', label: 'HIMALAYAN'},{value: 'INTERCEPTOR', label: 'INTERCEPTOR'},{value: 'METEOR', label: 'METEOR'},{value: 'SCRAM', label: 'SCRAM'},],
    SANYANG: [{value: 'ENJOY', label: 'ENJOY'},{value: 'HUSKY', label: 'HUSKY'},{value: 'PASSING', label: 'PASSING'},],
    'SHINERAY ': [{value: '50-Q', label: '50-Q'},{value: 'BOLT', label: 'BOLT'},{value: 'PT-02', label: 'PT-02'},{value: 'PT-03', label: 'PT-03'},{value: 'RETRO', label: 'RETRO'},{value: 'SE-1', label: 'SE-1'},{value: 'SE-2', label: 'SE-2'},{value: 'SHI', label: 'SHI'},{value: 'SUN', label: 'SUN'},{value: 'SUPER', label: 'SUPER'},{value: 'WORKER', label: 'WORKER'},{value: 'XY', label: 'XY'},],
    SIAMOTO: [{value: 'SCROSS', label: 'SCROSS'},],
    SUNDOWN: [{value: 'AKROS', label: 'AKROS'},{value: 'ERGON', label: 'ERGON'},{value: 'FIFTY', label: 'FIFTY'},{value: 'FUTURE', label: 'FUTURE'},{value: 'HUNTER', label: 'HUNTER'},{value: 'MAX', label: 'MAX'},{value: 'PALIO', label: 'PALIO'},{value: 'PGO', label: 'PGO'},{value: 'STX', label: 'STX'},{value: 'SUPER', label: 'SUPER'},{value: 'VBLADE', label: 'VBLADE'},{value: 'WEB', label: 'WEB'},],
    'SUPER SOCO': [{value: 'CHANGE', label: 'CHANGE'},{value: 'CUX', label: 'CUX'},{value: 'TC', label: 'TC'},{value: 'TSX', label: 'TSX'},],
    'SUZUKI ': [{value: 'ADDRESS/AE', label: 'ADDRESS/AE'},{value: 'ADDRESS/AG', label: 'ADDRESS/AG'},{value: 'AN', label: 'AN'},{value: 'BANDIT', label: 'BANDIT'},{value: 'BOULEVARD', label: 'BOULEVARD'},{value: 'BURGMAN', label: 'BURGMAN'},{value: 'DL', label: 'DL'},{value: 'DR', label: 'DR'},{value: 'DR-Z400E', label: 'DR-Z400E'},{value: 'EN', label: 'EN'},{value: 'FREEWIND', label: 'FREEWIND'},{value: 'GLADIUS', label: 'GLADIUS'},{value: 'GS', label: 'GS'},{value: 'GSR', label: 'GSR'},{value: 'GSX', label: 'GSX'},{value: 'GSX-R', label: 'GSX-R'},{value: 'GSX-S', label: 'GSX-S'},{value: 'INAZUMA', label: 'INAZUMA'},{value: 'INTRUDER', label: 'INTRUDER'},{value: 'KATANA', label: 'KATANA'},{value: 'LETS', label: 'LETS'},{value: 'LT', label: 'LT'},{value: 'MARAUDER', label: 'MARAUDER'},{value: 'RF', label: 'RF'},{value: 'RM', label: 'RM'},{value: 'RMX', label: 'RMX'},{value: 'SAVAGE', label: 'SAVAGE'},{value: 'SV650', label: 'SV650'},{value: 'TL', label: 'TL'},{value: 'VX', label: 'VX'},],
    TARGOS: [{value: 'TRIMOTO', label: 'TRIMOTO'},],
    TIGER: [{value: 'TRCICLO', label: 'TRCICLO'},{value: 'TRICICLO', label: 'TRICICLO'},],
    TRAXX: [{value: 'CJ', label: 'CJ'},{value: 'DUNNA', label: 'DUNNA'},{value: 'JH', label: 'JH'},{value: 'JL', label: 'JL'},{value: 'JS', label: 'JS'},{value: 'SKY', label: 'SKY'},{value: 'WORK', label: 'WORK'},],
    TRIUMPH: [{value: 'ADVENTURER', label: 'ADVENTURER'},{value: 'BONNEVILLE', label: 'BONNEVILLE'},{value: 'DAYTONA', label: 'DAYTONA'},{value: 'LEGEND', label: 'LEGEND'},{value: 'ROCKET', label: 'ROCKET'},{value: 'SCRAMBLER', label: 'SCRAMBLER'},{value: 'SPEED', label: 'SPEED'},{value: 'SPRINT', label: 'SPRINT'},{value: 'STREET', label: 'STREET'},{value: 'THRUXTON', label: 'THRUXTON'},{value: 'THUNDERBIRD', label: 'THUNDERBIRD'},{value: 'TIGER', label: 'TIGER'},{value: 'TRIDENT', label: 'TRIDENT'},{value: 'TROPHY', label: 'TROPHY'},{value: 'TT', label: 'TT'},],
    VENTO: [{value: 'REBELLIAN', label: 'REBELLIAN'},{value: 'TRITON', label: 'TRITON'},{value: 'VTHUNDER', label: 'VTHUNDER'},],
    VOLTZ: [{value: 'EV01', label: 'EV01'},{value: 'EV1', label: 'EV1'},{value: 'EVS', label: 'EVS'},],
    WATTS: [{value: 'W125', label: 'W125'},],
    WUYANG: [{value: 'JET+', label: 'JET+'},{value: 'MIND', label: 'MIND'},{value: 'WY', label: 'WY'},],
    YAMAHA: [{value: '750', label: '750'},{value: 'AXIS', label: 'AXIS'},{value: 'BW', label: 'BW'},{value: 'CRYPTON', label: 'CRYPTON'},{value: 'DT', label: 'DT'},{value: 'FAZER', label: 'FAZER'},{value: 'FLUO', label: 'FLUO'},{value: 'FZ15', label: 'FZ15'},{value: 'FZ25', label: 'FZ25'},{value: 'FZ6', label: 'FZ6'},{value: 'FZR', label: 'FZR'},{value: 'JOG', label: 'JOG'},{value: 'MAJESTY', label: 'MAJESTY'},{value: 'MT-01', label: 'MT-01'},{value: 'MT-03', label: 'MT-03'},{value: 'MT-07/MT-07', label: 'MT-07/MT-07'},{value: 'MT-09', label: 'MT-09'},{value: 'NEO', label: 'NEO'},{value: 'NMAX', label: 'NMAX'},{value: 'RD', label: 'RD'},{value: 'RDZ', label: 'RDZ'},{value: 'ROYAL', label: 'ROYAL'},{value: 'T115', label: 'T115'},{value: 'TDM', label: 'TDM'},{value: 'TDR', label: 'TDR'},{value: 'TMAX', label: 'TMAX'},{value: 'TRX', label: 'TRX'},{value: 'TT-R', label: 'TT-R'},{value: 'V-MAX', label: 'V-MAX'},{value: 'WR', label: 'WR'},{value: 'XJ', label: 'XJ'},{value: 'XJ6', label: 'XJ6'},{value: 'XJR', label: 'XJR'},{value: 'XMAX', label: 'XMAX'},{value: 'XT', label: 'XT'},{value: 'XTZ', label: 'XTZ'},{value: 'XV', label: 'XV'},{value: 'XVS', label: 'XVS'},{value: 'YBR', label: 'YBR'},{value: 'YFM', label: 'YFM'},{value: 'YFS', label: 'YFS'},{value: 'YFZ', label: 'YFZ'},{value: 'YS', label: 'YS'},{value: 'YZ', label: 'YZ'},{value: 'YZF', label: 'YZF'},],
    ZONTES: [{value: 'R', label: 'R'},{value: 'T', label: 'T'},{value: 'V', label: 'V'},]
  }

  const brandOptions = {
    Carro: [
      {value: 'ACURA', label: 'ACURA'},
      {value: 'AGRALE', label: 'AGRALE'},
      {value: 'ALFA ROMEO', label: 'ALFA ROMEO'},
      {value: 'AM GEN', label: 'AM GEN'},
      {value: 'ASIA MOTORS', label: 'ASIA MOTORS'},
      {value: 'ASTON MARTIN', label: 'ASTON MARTIN'},
      {value: 'AUDI', label: 'AUDI'},
      {value: 'BABY', label: 'BABY'},
      {value: 'BMW', label: 'BMW'},
      {value: 'BRM', label: 'BRM'},
      {value: 'BUGRE', label: 'BUGRE'},
      {value: 'BYD', label: 'BYD'},
      {value: 'CAB MOTORS', label: 'CAB MOTORS'},
      {value: 'CADILLAC', label: 'CADILLAC'},
      {value: 'CBT JIPE', label: 'CBT JIPE'},
      {value: 'CHANA', label: 'CHANA'},
      {value: 'CHANGAN', label: 'CHANGAN'},
      {value: 'CHERY', label: 'CHERY'},
      {value: 'CHEVROLET', label: 'CHEVROLET'},
      {value: 'CHRYSLER', label: 'CHRYSLER'},
      {value: 'CITROËN', label: 'CITROËN'},
      {value: 'CROSS LANDER', label: 'CROSS LANDER'},
      {value: 'D2D', label: 'D2D'},
      {value: 'DAEWOO', label: 'DAEWOO'},
      {value: 'DAIHATSU', label: 'DAIHATSU'},
      {value: 'DODGE', label: 'DODGE'},
      {value: 'EFFA', label: 'EFFA'},
      {value: 'ENGESA', label: 'ENGESA'},
      {value: 'ENVEMO', label: 'ENVEMO'},
      {value: 'FERRARI', label: 'FERRARI'},
      {value: 'FIAT', label: 'FIAT'},
      {value: 'FIBRAVAN', label: 'FIBRAVAN'},
      {value: 'FORD', label: 'FORD'},
      {value: 'FOTON', label: 'FOTON'},
      {value: 'FYBER', label: 'FYBER'},
      {value: 'GEELY', label: 'GEELY'},
      {value: 'GREAT WALL', label: 'GREAT WALL'},
      {value: 'GURGEL', label: 'GURGEL'},
      {value: 'GWM', label: 'GWM'},
      {value: 'HAFEI', label: 'HAFEI'},
      {value: 'HITECH ELECTRIC', label: 'HITECH ELECTRIC'},
      {value: 'HONDA', label: 'HONDA'},
      {value: 'HYUNDAI', label: 'HYUNDAI'},
      {value: 'ISUZU', label: 'ISUZU'},
      {value: 'IVECO', label: 'IVECO'},
      {value: 'JAC', label: 'JAC'},
      {value: 'JAGUAR', label: 'JAGUAR'},
      {value: 'JEEP', label: 'JEEP'},
      {value: 'JINBEI', label: 'JINBEI'},
      {value: 'JPX', label: 'JPX'},
      {value: 'KIA MOTORS', label: 'KIA MOTORS'},
      {value: 'LADA', label: 'LADA'},
      {value: 'LAMBORGHINI', label: 'LAMBORGHINI'},
      {value: 'LAND ROVER', label: 'LAND ROVER'},
      {value: 'LEXUS', label: 'LEXUS'},
      {value: 'LIFAN', label: 'LIFAN'},
      {value: 'LOBINI', label: 'LOBINI'},
      {value: 'LOTUS', label: 'LOTUS'},
      {value: 'MAHINDRA', label: 'MAHINDRA'},
      {value: 'MASERATI', label: 'MASERATI'},
      {value: 'MATRA', label: 'MATRA'},
      {value: 'MAZDA', label: 'MAZDA'},
      {value: 'MCLAREN', label: 'MCLAREN'},
      {value: 'MERCEDES-BENZ', label: 'MERCEDES-BENZ'},
      {value: 'MERCURY', label: 'MERCURY'},
      {value: 'MG', label: 'MG'},
      {value: 'MINI', label: 'MINI'},
      {value: 'MITSUBISHI', label: 'MITSUBISHI'},
      {value: 'MIURA', label: 'MIURA'},
      {value: 'NISSAN', label: 'NISSAN'},
      {value: 'PEUGEOT', label: 'PEUGEOT'},
      {value: 'PLYMOUTH', label: 'PLYMOUTH'},
      {value: 'PONTIAC', label: 'PONTIAC'},
      {value: 'PORSCHE', label: 'PORSCHE'},
      {value: 'RAM', label: 'RAM'},
      {value: 'RELY', label: 'RELY'},
      {value: 'RENAULT', label: 'RENAULT'},
      {value: 'ROLLS-ROYCE', label: 'ROLLS-ROYCE'},
      {value: 'ROVER', label: 'ROVER'},
      {value: 'SAAB', label: 'SAAB'},
      {value: 'SATURN', label: 'SATURN'},
      {value: 'SEAT', label: 'SEAT'},
      {value: 'SHINERAY', label: 'SHINERAY'},
      {value: 'SMART', label: 'SMART'},
      {value: 'SSANGYONG', label: 'SSANGYONG'},
      {value: 'SUBARU', label: 'SUBARU'},
      {value: 'SUZUKI', label: 'SUZUKI'},
      {value: 'TAC', label: 'TAC'},
      {value: 'TOYOTA', label: 'TOYOTA'},
      {value: 'TROLLER', label: 'TROLLER'},
      {value: 'VOLKSWAGEN', label: 'VOLKSWAGEN'},
      {value: 'VOLVO', label: 'VOLVO'}
      
    ],
    Moto: [
      {value: 'ADLY', label: 'ADLY'},
      {value: 'AGRALE ', label: 'AGRALE '},
      {value: 'AMAZONAS', label: 'AMAZONAS'},
      {value: 'APRILIA', label: 'APRILIA'},
      {value: 'ATALA', label: 'ATALA'},
      {value: 'AVELLOZ', label: 'AVELLOZ'},
      {value: 'BAJAJ', label: 'BAJAJ'},
      {value: 'BEE', label: 'BEE'},
      {value: 'BENELLI', label: 'BENELLI'},
      {value: 'BETA', label: 'BETA'},
      {value: 'BIMOTA', label: 'BIMOTA'},
      {value: 'BMW ', label: 'BMW '},
      {value: 'BRANDY', label: 'BRANDY'},
      {value: 'BRAVA', label: 'BRAVA'},
      {value: 'BRP', label: 'BRP'},
      {value: 'BUELL', label: 'BUELL'},
      {value: 'BUENO', label: 'BUENO'},
      {value: 'BULL', label: 'BULL'},
      {value: 'BYCRISTO', label: 'BYCRISTO'},
      {value: 'CAGIVA', label: 'CAGIVA'},
      {value: 'CALOI', label: 'CALOI'},
      {value: 'DAELIM', label: 'DAELIM'},
      {value: 'DAFRA', label: 'DAFRA'},
      {value: 'DAYANG', label: 'DAYANG'},
      {value: 'DAYUN', label: 'DAYUN'},
      {value: 'DERBI', label: 'DERBI'},
      {value: 'DUCATI', label: 'DUCATI'},
      {value: 'EMME', label: 'EMME'},
      {value: 'FOX', label: 'FOX'},
      {value: 'FUSCO MOTOSEGURA', label: 'FUSCO MOTOSEGURA'},
      {value: 'FYM', label: 'FYM'},
      {value: 'GARINNI', label: 'GARINNI'},
      {value: 'GAS GAS', label: 'GAS GAS'},
      {value: 'GREEN', label: 'GREEN'},
      {value: 'HAOBAO', label: 'HAOBAO'},
      {value: 'HAOJUE', label: 'HAOJUE'},
      {value: 'HARLEY-DAVIDSON', label: 'HARLEY-DAVIDSON'},
      {value: 'HARTFORD', label: 'HARTFORD'},
      {value: 'HERO', label: 'HERO'},
      {value: 'HONDA ', label: 'HONDA '},
      {value: 'HUSABERG', label: 'HUSABERG'},
      {value: 'HUSQVARNA', label: 'HUSQVARNA'},
      {value: 'INDIAN', label: 'INDIAN'},
      {value: 'IROS', label: 'IROS'},
      {value: 'JIAPENG VOLCANO', label: 'JIAPENG VOLCANO'},
      {value: 'JOHNNYPAG', label: 'JOHNNYPAG'},
      {value: 'JONNY', label: 'JONNY'},
      {value: 'KAHENA', label: 'KAHENA'},
      {value: 'KASINSKI', label: 'KASINSKI'},
      {value: 'KAWASAKI', label: 'KAWASAKI'},
      {value: 'KTM', label: 'KTM'},
      {value: 'KYMCO', label: 'KYMCO'},
      {value: 'LANDUM', label: 'LANDUM'},
      {value: "L'AQUILA", label: "L'AQUILA"},
      {value: 'LAVRALE', label: 'LAVRALE'},
      {value: 'LERIVO', label: 'LERIVO'},
      {value: 'LIFAN ', label: 'LIFAN '},
      {value: 'LON-V', label: 'LON-V'},
      {value: 'MAGRÃO TRICICLOS', label: 'MAGRÃO TRICICLOS'},
      {value: 'MALAGUTI', label: 'MALAGUTI'},
      {value: 'MIZA', label: 'MIZA'},
      {value: 'MOTO GUZZI', label: 'MOTO GUZZI'},
      {value: 'MOTOCAR', label: 'MOTOCAR'},
      {value: 'MOTORINO', label: 'MOTORINO'},
      {value: 'MRX', label: 'MRX'},
      {value: 'MV AGUSTA', label: 'MV AGUSTA'},
      {value: 'MVK', label: 'MVK'},
      {value: 'NIU', label: 'NIU'},
      {value: 'ORCA', label: 'ORCA'},
      {value: 'PEGASSI', label: 'PEGASSI'},
      {value: 'PEUGEOT ', label: 'PEUGEOT '},
      {value: 'PIAGGIO', label: 'PIAGGIO'},
      {value: 'POLARIS', label: 'POLARIS'},
      {value: 'REGAL RAPTOR', label: 'REGAL RAPTOR'},
      {value: 'RIGUETE', label: 'RIGUETE'},
      {value: 'ROYAL ENFIELD', label: 'ROYAL ENFIELD'},
      {value: 'SANYANG', label: 'SANYANG'},
      {value: 'SHINERAY ', label: 'SHINERAY '},
      {value: 'SIAMOTO', label: 'SIAMOTO'},
      {value: 'SUNDOWN', label: 'SUNDOWN'},
      {value: 'SUPER SOCO', label: 'SUPER SOCO'},
      {value: 'SUZUKI ', label: 'SUZUKI '},
      {value: 'TARGOS', label: 'TARGOS'},
      {value: 'TIGER', label: 'TIGER'},
      {value: 'TRAXX', label: 'TRAXX'},
      {value: 'TRIUMPH', label: 'TRIUMPH'},
      {value: 'VENTO', label: 'VENTO'},
      {value: 'VOLTZ', label: 'VOLTZ'},
      {value: 'WATTS', label: 'WATTS'},
      {value: 'WUYANG', label: 'WUYANG'},
      {value: 'YAMAHA', label: 'YAMAHA'},
      {value: 'ZONTES', label: 'ZONTES'}
    ]
  }

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        if(item) {
          setBrand(item.brand)
          setColor(item.color)
          setModel(item.model)
          setPlate(item.plate)
          setType(item.type)
          setYear((item.year).toString())
          setId(item.id)
          setBody(item.body)
        }
      }
      fetchData()
    }, [])
  )

  const handleAtualizar = async () => {
    setLoading(true)
    try {
      if (plate===''||type===''||(type==='Carro' && body==='')||brand===''||model===''||year===''||color==='') {
        setLoading(false)
        Alert.alert('ATENÇÃO', 'Selecione uma opção para todas as listas', [{text: 'OK'}])
      } else {
        const resp = await Axios.post('http://' + server + '/api/checkVehicles', {email: userEmail, plate: plate})
        if (!id) {
          if (resp.data.isUsed === true) {
            setLoading(false)
            Alert.alert('ERRO', 'Essa placa já está cadastrada', [{text: 'OK'}])
          } else {
            if (type==='Moto') {
              await Axios.post('http://' + server + '/api/insertVehicle', {email: userEmail, brand: brand, color: color, model: model, plate: plate, type: type, year: year, body: 'Moto'})
            } else {
              await Axios.post('http://' + server + '/api/insertVehicle', {email: userEmail, brand: brand, color: color, model: model, plate: plate, type: type, year: year, body: body})
            }
            setLoading(false)
            Alert.alert('ÊXITO', 'Novo veículo cadastrado com sucesso', [{
              text: 'OK', 
              onPress: () => navigation.navigate('Perfil')}
            ])
          }
        } else {
          await Axios.post('http://' + server + '/api/updateVehicle', {id: id, brand: brand, color: color, model: model, type: type, year: year, body: body, plate: plate})
          setLoading(false)
          Alert.alert('ÊXITO', 'Dados atualizados com sucesso', [{
            text: 'OK', 
            onPress: () => navigation.navigate('Perfil')}
          ])
        }
      }
    } catch (error) {
      setLoading(false)
      Alert.alert('ERRO', error.response.data, [{text: 'OK'}])
    }
  }

  return (
    <View className="p-5 flex-1 bg-white">
      <Text className="w-full text-blue-950/90 font-bold text-4xl text-center mt-20">{id ? 'Alterar veículo' : 'Cadastrar veículo'}</Text>
        <Text className="mt-6 ml-1 text-neutral-500">Placa</Text>
        <TextInput
          className="ml-1 mb-4 border-b border-neutral-300 focus:border-neutral-600 font-bold w-28"
          value={plate} 
          onChangeText={setPlate}
          maxLength={9}
        />
        <View className="w-full rounded-md mt-4 relative">
          <SelectList setSelected={setType} data={typeOptions} placeholder={id!=='' ? type : 'Selecione um tipo de veículo...'} search={false}/>
          <View className="mt-2">
            {type==='Carro' && <SelectList setSelected={setBody} data={bodyOptions} placeholder={id!=='' ? body : 'Selecione uma carroceria...'} search={false}/>}
          </View>
          {(type==='Moto'||body!=='') &&
            <View className="mt-2">
              <SelectList setSelected={setBrand} data={brandOptions[type]} placeholder={id!=='' ? brand : 'Selecione uma marca...'}/>
            </View>
          }
          {brand!=='' &&
            <View className="mt-2">
              <SelectList setSelected={setModel} data={modelOptions[brand]} placeholder={id!=='' ? model : 'Selecione uma modelo...'}/>
            </View>
          }
          {model!=='' &&
            <View className="mt-2">
              <SelectList setSelected={setYear} data={yearOptions} placeholder={id!=='' ? year : 'Selecione um ano...'}/>
            </View>
          }
          {year!=='' &&
            <View className="mt-2">
              <SelectList setSelected={setColor} data={colorOptions} placeholder={id!=='' ? color : 'Selecione uma cor...'}/>
            </View>
          }
          {color!=='' &&
            <View className="items-center">
              <TouchableOpacity 
                className="h-12 bg-blue-950/90 items-center justify-center w-full mt-4" 
                onPress={() => {
                  Alert.alert('Confirmação', 'Você tem certeza?',
                    [
                      {text: 'Sim', onPress: () => {handleAtualizar()}},
                      {text: 'Não', style: 'cancel'}
                    ],
                    {cancelable: true}
                  )
                }}
              >
                {loading ? (<AppLoader/>) : (<Text className="text-white font-bold text-lg">{id ? 'Atualizar' : 'Cadastrar'}</Text>)}
              </TouchableOpacity>
            </View>
          }
        </View>
    </View>
  )
}