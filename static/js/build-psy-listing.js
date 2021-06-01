function findFilterForField (fieldName) {
  var filters = table.getFilters();
  for (var i = 0; i < filters.length; i++) {
    if (filters[i].field === fieldName) {
      return filters[i];
    }
  }
  return undefined;
}

function upsertFilterForField (fieldName, newValue) {
  var filter = findFilterForField(fieldName);

  if (!filter) {
    // New filter : this is the first input into search field by user
    table.addFilter(fieldName, 'like', newValue);
    return;
  }
  // Existing filter : update it
  table.removeFilter(fieldName, 'like', filter.value);
  table.addFilter(fieldName, 'like', newValue);
}

var setupFilter = function (fieldName) {
  var filterEl = document.getElementById(fieldName + '-filter-value');

  // Trigger setFilter function with correct parameters
  function updateFilter () {
    upsertFilterForField(fieldName, filterEl.value);
  }

  filterEl.addEventListener('keyup', updateFilter);
};
setupFilter('lastName');
setupFilter('departement');

var psyListElement = document.getElementById('psy-list');
var psyList = JSON.parse(psyListElement.textContent);

var table = new Tabulator('#psy-table', {
  data: psyList, //assign data to table
  langs: { // http://tabulator.info/docs/4.2/localize#setup
    'fr-fr': { //French language definition
      'pagination': {
        'first': 'Première',
        'first_title': 'Première Page',
        'last': 'Dernière',
        'last_title': 'Dernière Page',
        'prev': 'Précédent',
        'prev_title': 'Page Précédente',
        'next': 'Suivant',
        'next_title': 'Page Suivante',
      },
      'headerFilters': {
        'default': 'Rechercher par adresse', //default header filter placeholder text
      }
    },
  },
  tooltipsHeader: true,
  layout: 'fitColumns',       //fit columns to width of table
  responsiveLayout: true,  //hide columns that dont fit on the table //@TODO
  tooltips: true,            //show tool tips on cells
  pagination: 'local',         //paginate the data
  paginationSize: 50,        //allow XX rows per page of data
  movableColumns: false,        //allow column order to be changed
  resizableRows: false,          //allow row order to be changed
  resizableColumns: true,
  variableHeight: false,
  columnHeaderVertAlign: 'middle',
  columns: [
    {
      title: 'Nom',
      field: 'lastName',
      sorter: 'string',
      maxWidth: 400,
      minWidth: 100,
      widthGrow: 3,
      cssClass: 'fr-p-3v',
      formatter: function (cell) {
        return cell.getRow().getData().lastName + ' ' + cell.getRow().getData().firstNames;
      }
    },
    {
      title: 'Adresse',
      field: 'departement',
      sorter: 'string',
      maxWidth: 400,
      widthGrow: 3,
      minWidth: 250,
      responsive: 0,
      headerSort: false,
      cssClass: 'fr-p-3v',
      formatter: function (cell) {
        var d = cell.getRow().getData();
        return '<a href="https://www.openstreetmap.org/search?query=' + d.address + '" target="_blank">50 SOLA 66110 MONTBOLO</a><br/>' +
          '<span>' + d.departement + '</span><br/>';
      }
    },
    {
      title: 'Contact',
      field: 'email',
      sorter: 'string',
      maxWidth: 200,
      widthGrow: 2,
      headerSort: false,
      cssClass: 'fr-p-3v',
      formatter: function (cell) {
        var d = cell.getRow().getData();
        return '<a href="' + d.email + '">' + d.email + '</a><br/>' +
          '<a href="tel:' + d.phone + '">' + d.phone + '</a>';
      }
    },
    {
      title: 'Visio',
      field: 'teleconsultation',
      headerTooltip: 'Téléconsultation',
      width: 91,
      responsive: 0,
      sorter: 'boolean',
      hozAlign: 'center',
      tooltip: 'Est ce que le psychologue accepte la téléconsultation ?',
      formatter: 'tickCross',
      cssClass: 'fr-p-3v'
    },
    {
      title: 'Langues parlées', field: 'languages', formatter: 'textarea', headerSort: false, width: 150, cssClass: 'fr-p-3v'
    },
    {
      title: 'Site web',
      field: 'website',
      sorter: 'string',
      maxWidth: 200,
      widthGrow: 2,
      formatter: 'link',
      formatterParams: { labelField: 'website', target: '_blank' },
      headerSort: false,
      cssClass: 'fr-p-3v'
    },
  ],
  headerFilterPlaceholder: 'Rechercher un psychologue' // http://tabulator.info/docs/4.9/filter#header
});
table.setLocale('fr-fr');
