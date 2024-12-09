# Software Development Plan
IEC 62304 standard for Class A devices will be followed.
The deliverables of the software –

- Native iOS and Android applications with the following features
  - Display Pollen, COVID, Air Quality and Water quality data.
  - Session management with sign in and sign up.
  - Ability to report instances of COVID to others.
    
For traceability between software requirements, manual or automated integration testing will be done, along with a traceability matrix. 
All bugs, defects and other issues will be tracked using GitHub Issues and will be assigned the bug tag and the developer responsible to resolve it.  

# Software Implementation Plan
1.  **Standards** – IEC 62304 standard will be adopted
2.  **Methods** – Standard Waterfall model will be used to implement it. Comprehensive unit testing and code reviews will be conducted for QA.
3.  **Tools** – React Native and Firebase authentication and Firestore will be used.

# Software Integration Plan
The MANUFACTURER shall include or reference in the software development plan, a plan to integrate the software Items and perform testing during integration. 
1.  **Modular Integration**: First, individual software modules (UI, API, backend services) will be integrated.
2.  **Incremental Testing**: After each integration step, a set of predefined integration tests will be performed.
3.  **System Integration**: All software modules will be integrated into a single application, followed by end-to-end system testing

# Software Verification Plan
The MANUFACTURER shall include or reference in the software development plan the following VERIFICATION information: a) DELIVERABLES requiring VERIFICATION; b) the required VERIFICATION TASKS for each life cycle ACTIVITY; c) milestones at which the DELIVERABLES are VERIFIED; and d) the acceptance criteria for VERIFICATION of the DELIVERABLES

1.  DELIVERABLES Requiring VERIFICATION
    1.  Software Requirement Specification (SRS)
    2.  Design Documentation
2.  Required VERIFICATION TASKS for Each Lifecycle Activity
    1.  Requirements Phase: Verification of SRS through peer review.
    2.  Design Phase: Design reviews for compliance with SRS.
    3.  Implementation Phase: Code reviews and unit testing.
    4.  Testing Phase: Integration testing, system testing, and user acceptance testing.
3. Milestones at Which the DELIVERABLES Are VERIFIED
   1. End of each Agile sprint: Code and test deliverables are reviewed and verified.
   2. Pre-release: A final round of testing ensures all requirements have been met.
4. Acceptance Criteria for VERIFICATION of the DELIVERABLES
   1. 100% coverage of test cases for critical software features.
   2. All critical bugs resolved before release.
   3. Verification that user data and location information are securely encrypted.

# Software Risk Management Plan

The MANUFACTURER shall include or reference in the software development plan, a plan to conduct the ACTIVITIES and TASKS of the software RISK MANAGEMENT PROCESS, including the management of RISKS relating to SOUP. [Class A, B, C].

**Risk Assessment**:
Identify potential risks and analyse the impact of potential risks.
**Risk Mitigation**:
Implement failover mechanisms for third-party API data unavailability. Use encryption and secure authentication to mitigate data breach risks.

# Software Configuration Management Plan
- Versioning Strategy: We will use versioning for clear tracking, with separate branches for development, main (production), and feature/bugfix work.
- Deployment Process: Using CI/CD, we’ll deploy updates to development, staging, and production environments, with major releases quarterly, minor releases monthly, and patches as needed.
- Patch Management: Patches are prioritized by severity, with critical fixes deployed immediately, and low-impact issues scheduled for the next release. Production updates will occur during off-peak hours, with a rollback plan for quick recovery.
