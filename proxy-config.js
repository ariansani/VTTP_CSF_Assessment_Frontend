module.exports = [
    {
      context: [ '/api/**' ], //match these request
      target: 'https://vttp-csf-assessment-arian.herokuapp.com/', //SpringBoot!
      secure: false,
    }
  ]