angular.module('DemoServices')


//Constants used in rendering dates.
.constant('DATE_CONSTANTS', {
  'months': ['January', 'February', 'March', 'April', 'May', 'June', 'July',
       'August', 'September', 'October', 'November','December'],
  'daysOfWeek': ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'],
  'daysPerMonth': [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  'referenceDate': new Date(2014, 0, 1),
  'hours': [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  'day': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  'repeatDays': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
       18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
})

//Constants used in modal
.constant('MODAL_CONSTANTS', {
  'saveOptions':[
       {'text': 'Save only this event', 'value': 'NO'},
       {'text': 'Save this and all following events', 'value': 'AFTER'},
       {'text': 'Save all events', 'value': 'YES'},
       {'text':'Save as a new event','value':'CLONE'}
       ],
 'deleteOptions':[
      {'text': 'Delete only this event', 'value': 'NO'},
      {'text': 'Delete this and all following events', 'value': 'AFTER'},
      {'text': 'Delete all events', 'value': 'YES'}
      ],
      'dateOptions': {'year-format': "'yy'", 'starting-day': 1 },
      'timePicker': {'timeFormat': 'H:i:s'},
      'tpSelect2': {'width': 90, 'containerCssClass': 'event-modal-timepicker'}
})

//Constants used for select option 
.constant('SELECT_CONSTANTS', {
  'singleSelect2Options': {'width': 200, 'minimumResultsForSearch': -1},
  'multiSelect2Options': {'width': 300}
})

//Constants used for reccuring Option
.constant('REPEAT_CONSTANTS', {
  'recurrenceModel' : {
    'DAILY': {display: 'Day'},
    'WEEKLY': {display: 'Week', options: ['byweekday']},
    '12DAY': {display: '12 Day', options: ['bysetpos']},
    'MONTHLY': {display: 'Month'},
    'YEARLY': {display: 'Year'}
  },
  'recurrenceEndModel' : {
    never: {display: ''},
    date: {display: 'End Date:', options: ['until_date']},
    count: {display: 'Occurrences:', options: ['count']}
  },
  'recurringForm' : {
    byweekday: [],
    bysetpos: [],
    repeatEvent: false,
    recurrenceEnd: 'never',
    frequency: 'DAILY',
    interval: '1',
    count: '1'
  }
})
