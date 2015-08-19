angular.module('DemoServices')

.service('updateReccurenceService', function() {
  this.updateRecurrenceShiftDetails = function(recurringForm, recurrenceModel,
      recurrenceEndModel, eventForm) {
    var frequency = recurringForm.frequency,
    recurrenceEnd = recurringForm.recurrenceEnd,
    recurrenceOptions,
    recurrenceEndOptions = recurrenceEndModel[recurrenceEnd].options,
    newRecurringForm = {},

    formatRecOptions = function(recValue) {
      return recValue.join(' ').trim().replace(/\s+/g, ',');
    },
    updateOptions = function(options) {
      for (var i = 0; i < options.length; i++) {
        var option = options[i],
        recValue = recurringForm[option] ? recurringForm[option] : '',
          formattedOptions = angular.isArray(recValue) ?
            formatRecOptions(recValue) : recValue;

            if (formattedOptions) {
              newRecurringForm[option] = formattedOptions;
            }
      }
    };

    if (recurrenceModel.hasOwnProperty(frequency)) {
      recurrenceOptions = recurrenceModel[frequency].options;
      newRecurringForm.frequency = frequency;
      newRecurringForm.interval = recurringForm.interval.toString();
      if (recurrenceOptions) {
        updateOptions(recurrenceOptions);
      }
    } else {
      newRecurringForm.frequency = 'WEEKLY';
      newRecurringForm.byweekday = frequency;
    }

    if (recurrenceEndOptions) {
      updateOptions(recurrenceEndOptions);
    }
    if (eventForm.changeAll != 'CLONE') {
      newRecurringForm.recurring_event_id = eventForm.recurrenceEventId;
      newRecurringForm.dtstart_recurr = recurringForm.dtstart;
      newRecurringForm.dtend_recurr = recurringForm.dtend;
    }
    eventForm.recurringEventDetails = newRecurringForm;
  };

});
