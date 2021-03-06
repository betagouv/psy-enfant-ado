var psyListElement = document.getElementById('psy-list');
var psyList = JSON.parse(psyListElement.textContent);
var table = new Tabulator('#psy-table', {
  data: psyList,
  tooltipsHeader: true,
  layout: 'fitData',
  responsiveLayout: 'hide',
  tooltips: true,
  pagination: false,
  movableColumns: false,
  resizableRows: false,
  resizableColumns: true,
  columnHeaderVertAlign: 'middle',
  placeholder: 'Il n’y a pas de psychologues disponibles dans ce département. <br/>' +
    'Notre annuaire est mise à jour quotidiennement, revenez le consulter dans quelques jours.<br/><br/><br/>' +
    'Vous êtes psychologue et voulez devenir partenaire du dispositif&nbsp;?<br/><br/>' +
    '<a class="fr-btn fr-btn--alt" ' +
    'onclick="gtag(\'event\',\'conversion\',{\'allow_custom_scripts\':true,\'send_to\':\'DC-2953234/psyen0/itag-0+unique\'});" ' +
    'href="/#je-suis-psychologue">En savoir plus</a>',
  columns: [
    {
      title: 'Nom',
      field: 'lastName',
      sorter: 'string',
      width: 170,
      responsive: 0,
      cssClass: 'fr-p-3v',
      formatter: function (cell) {
        return '<strong>' + cell.getRow().getData().lastName + '</strong><br/><strong>' + cell.getRow().getData().firstNames + '</strong>';
      }
    },
    {
      title: 'Adresse',
      field: 'departement',
      sorter: 'string',
      width: 300,
      responsive: 0,
      headerSort: false,
      cssClass: 'fr-p-3v',
      formatter: function (cell) {
        var d = cell.getRow().getData();
        return '<a href="https://www.openstreetmap.org/search?query=' + d.address + '" target="_blank">' + d.address + '</a><br/>' +
          '<span>' + d.departement + '</span><br/>';
      }
    },
    {
      title: 'Contact',
      field: 'email',
      sorter: 'string',
      width: 100,
      responsive: 0,
      headerSort: false,
      cssClass: 'fr-p-3v',
      formatter: function (cell) {
        var d = cell.getRow().getData();
        return '<a href="tel:' + d.phone + '">' + d.phone + '</a>';
      }
    },
    {
      title: 'À distance',
      field: 'teleconsultation',
      headerTooltip: 'À distance',
      width: 130,
      responsive: 0,
      sorter: 'boolean',
      hozAlign: 'center',
      tooltip: 'Est ce que le psychologue accèpte la téléconsultation ?',
      formatter: 'tickCross',
      cssClass: 'fr-p-3v'
    },
    {
      title: 'Langues parlées',
      field: 'languages',
      formatter: 'textarea',
      headerSort: false,
      responsive: 0,
      width: 140,
      cssClass: 'fr-p-3v'
    },
    {
      title: 'Site web',
      field: 'website',
      sorter: 'string',
      width: 350,
      responsive: 0,
      formatter: 'link',
      formatterParams: { labelField: 'website', target: '_blank' },
      headerSort: false,
      cssClass: 'fr-p-3v'
    },
  ]
});
table.setLocale('fr-fr');

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

var setupFilter = function (fieldName, trigger) {
  var filterEl = document.getElementById(fieldName + '-filter-value');

  // Trigger setFilter function with correct parameters
  function updateFilter () {
    upsertFilterForField(fieldName, filterEl.value);
  }

  filterEl.addEventListener(trigger, updateFilter);
};

setupFilter('lastName', 'keyup');
setupFilter('departement', 'change');

var showTable = function () {
  var el = document.getElementsByClassName('psy-list-elements-to-show');
  for (var i = 0; i < el.length; i++) {
    el[i].style.display = 'block';
  }

  document.getElementById('departement-filter-value').removeEventListener('change', showTable);
};

document.getElementById('departement-filter-value').addEventListener('change', showTable);
