# Form

## Employer section:

- Capture and update values from fields.
- Add error messages
- Send number of errors to form component (to manage ability to "Save Progress")

## Reporting for unit:

- Send number of errors to form component (to manage ability to "Save Progress")

## Unit status section:

- Modularize this section code
- If unit is inactive, allow "Save Progress".
- If unit is active but in bargaining, show fields for # of members, PREVIOUS contract start and end and upload PREVIOUS contract, allow 'Save Progress'
- If unit is active and not bargaining, show fields for # of members, CBA effective dates, upload contract and then open option to add raises.
- Capture and update values from fields.
- Add error messages.
- Update number of errors in section and send to form component.

## ATBs:

- Modularize this section code
- If type of raise is % or hourly, show effective from field. Else remove and add stock answer in returned value. 
- Change 'Annually' to 'Annual/Lump Sum'. 
- If type of raise is hourly or lump, ask for starting rate and then the increase.
- Capture and update values from fields.
- Add error messages. 
- Add special errors appended to data if certain entries are made. See meeting notes.

## Special Raises:

- Modularize this section code.
- Add, where applicable the same field conditions as in ATB.
- Add error messages.
- Add special errors appended to data and shared with returned data fields.

