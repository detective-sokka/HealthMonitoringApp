# IEC62304 Verification Protocol

## Overview

Verification in medical device software ensures compliance with the requirements outlined in your project. For your Real-Time Environmental Risk Awareness App, each requirement (accuracy, alert notifications, user input functionality, and encryption) needs systematic testing.

### Test organization

Mapping Requirements to Test Cases:

- Single Requirement to Multiple Test Cases: A complex requirement, such as "display lead contaminants levels in water with an accuracy of ±1 ppb" can be broken into multiple test cases:
  - Test for correct lead levels input data.
  - Test for accuracy calculations.
  - Test for correct UI rendering of lead levels.
  
- Multiple Requirements in a Single Test Case: If related, multiple requirements can be tested together, like validating pH levels, lead levels, and E. coli data are displayed correctly on the same screen.

Test Strategy:

- Unit Tests: Check individual components or functions. For example:
  - Validate the algorithm calculating pH levels.
  - Test the accuracy of the GPS-based location service.
- Integration/Manual Tests: Test combined components.
  - Ensure the system fetches environmental data from APIs, processes it, and displays it in the app.
- End-to-End Tests: Simulate user behaviour.
  - Check if a notification is generated when PM2.5 exceeds 35 µg/m³
