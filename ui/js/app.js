window.actuary = {
  vm    : {},
  page  : {},

  DEFAULT_CARD_NUMBER     : 'ECO-',
  VALID_CARD_NUMBER_REGEX : /^[A-Z]+-\d+$/,
  EMPTY_ESTIMATION        : [
    { name  : 'Front-end',
      items : [
        { name  : 'JSP' },
        { name  : 'JavaScript' },
        { name  : 'CSS' } ] },
    { name  : 'Middle',
      items : [
        { name  : 'Model' },
        { name  : 'Controller' },
        { name  : 'Service' },
        { name  : 'Repository' },
        { name  : 'JRXML' } ] },
    { name  : 'Database',
      items : [
        { name  : 'Schema changes' },
        { name  : 'Queries' },
        { name  : 'Query complexity' } ] },
    { name  : 'Testing',
      items : [
        { name  : 'New scenarios' },
        { name  : 'Modify scenarios' },
        { name  : 'New step defs' },
        { name  : 'Modify step defs' },
        { name  : 'E2E' } ] },
    { name  : 'General',
      items : [
        { name  : 'Code smell' },
        { name  : 'Unknowns' } ] }
  ]
};