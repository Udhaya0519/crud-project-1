



const formEl = document.forms["request-form"]

const validateForm = new JustValidate(formEl,  {
  validateBeforeSubmitting: true,
})

validateForm
  .addField('#name-input', [
    {
      rule: 'required',
    },
    {
      rule: 'minLength',
      value: 3,
    },
    {
      rule: 'maxLength',
      value: 20,
    },
    {
        rule: 'customRegexp',
        value: /[a-z]/,
      },
  ],{
    errorFieldCssClass: ['invalid'],
  })
  .addField('#phone-no-input',[
    {
        rule: 'required',
    },
    {
        rule: 'number'
    },
    {
        rule: 'minLength',
        value: 10,
      },
      {
        rule: 'maxLength',
        value: 10,
      },
  ],{
    errorFieldCssClass: ['invalid'],
  })
  .addField('#date-input',[
    {
        rule: 'required'
    }
  ],{
    errorFieldCssClass: ['invalid'],
  })
  .addField('#city-input',[
    {
        rule: 'required'
    }
  ],{
    errorFieldCssClass: ['invalid'],
  })
  .addField('.address-input',[
    {
        rule: 'required'
    }
  ],{
    errorFieldCssClass: ['invalid'],
  })


export { validateForm } 

