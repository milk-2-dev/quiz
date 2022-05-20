import { useState } from 'react'

export function useFormFields(initialState) {
  const [fields, setValues] = useState(initialState)

  return [
    fields,
    function (event) {
      const fieldName = event.target.getAttribute('controlid')
      setValues({
        ...fields,
        [fieldName]: {
          ...fields[fieldName],
          value: event.target.value,
          errorMessage: null,
        },
      })
    },
    function (data) {
      // [
      //   {
      //     field: 'password',
      //     message: `Min length for the passwor is 6 chars`,
      //   },
      //    { field: 'password',
      //     message: `Min length for the passwor is 6 chars`,
      //   },
      // ]

      const newData = { ...fields }

      for (let index = 0; index < data.length; index++) {
        newData[data[index].field].errorMessage = data[index].message
      }

      setValues({
        ...fields,
        ...newData,
      })
    },
  ]
}
