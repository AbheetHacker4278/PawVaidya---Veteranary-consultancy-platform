export const privacypolicydata = [
    {
      question: "How does PawVaidya collect and manage user data?",
      answers: [
        "At PawVaidya, we collect user data like name, email, password, current state information, and current district information during signup on the website.",
        "Let’s come to password , we store password into our database in form of long hash , for hashing purpose we are using argon2 and bcrypt which provides the hash of 32byte , due to this it is difficult to decrypt.",
        "Let’s come to email , we are using email for account verification , welcome email , password reset , or any updates related to pawVaidya.",
        "Let’s come into state and district , we are using your state and district because to map you with veterinary location , so it is easy for user to find the nearest veterinary.",
      ]
    },
    {
      question: "How does PawVaidya handle data breaches or data leaks?",
      answers: [
        "It is not possible of any kind of data leaks , but some how attacker got the access of database , so it is very difficult for attacker to get access of user account because password are protected with highly secured encryption technique.",
        "If any team member or any person , or other is involve in such activity like data tampering , phishing , attacks , etc. So pawVaidya will take strict action against them under various sections of IT ACT 2000 , DPDP , IPC."
      ]
    },
    {
      question: "For how long does PawVaidya retain user data?",
      answers: [
        "If a user creates an account but does not verify it, the account is retained for only 7 days before being automatically deleted.",
        "Verified accounts and their associated data are retained as long as the user remains active, or until the user requests account deletion."
      ]
    },
    {
      question: "Is the pet's health report shared with any doctors other than the booked doctor?",
      answers: [
        "No, the health reports are strictly shared only with the booked doctor.",
        "We prioritize user privacy and ensure no unauthorized sharing of pet health data."
      ]
    },
    {
      question: "Is the PawVaidya website vulnerable to any major or minor attacks?",
      answers: [
        "No, the PawVaidya website is protected against major and minor attacks due to scheduled security updates.",
        "We utilize advanced security measures such as encryption, firewalls, and intrusion detection systems to safeguard our platform."
      ]
    },
    {
      question: "What are the User Rights Policies of PawVaidya?",
      answers: [
        "Data Access: Users can request access to their personal data stored by PawVaidya.",
        "Data Modification: Users can update their personal information through their account settings.",
        "Data Deletion: Users can request the deletion of their data by contacting support. Upon confirmation, all data will be permanently removed from our systems."
      ]
    },
    {
      question: "How Third-party Integrations are there in PawVaidya?",
      answers: [
        "PawVaidya uses third-party services such as payment gateways and analytics tools. These services may access minimal user data required for their functionality. All third-party services used by PawVaidya comply with strict data protection standards.."
      ]
    },
    {
      question: "How users can Terminate their account?",
      answers: [
        "Users can close their accounts at any time by contacting support or using the account settings feature.",
        "Upon account closure, all associated data will be deleted within 30 days unless required for compliance with legal obligations."
      ]
    },
    {
      question: "How PawVaidya executes the Behavioral Analytics?",
      answers: [
        "PawVaidya collects behavioral data (e.g., pages visited, actions taken) to improve user experience and provide personalized recommendations.",
        "This data is anonymized and retained for a limited duration to ensure user privacy. "
      ]
    },
    {
      question: "PawVaidya uses user’s data for marketing?",
      answers: [
        "PawVaidya may use user-provided contact information for marketing purposes, such as promotions or newsletters, only with explicit user consent.",
        "Users can opt out of marketing communications at any time."
      ]
    }
  ];
  