function findFilterForField(fieldName) {
  var filters = table.getFilters();
  for (var i = 0; i < filters.length; i ++) {
    if (filters[i].field === fieldName) {
      return filters[i];
    }
  }
  return undefined;
}

function upsertFilterForField(fieldName, newValue) {
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

var setupFilter = function(fieldName) {
  var filterEl = document.getElementById(fieldName + "-filter-value");
  // Trigger setFilter function with correct parameters
  function updateFilter(){
    upsertFilterForField(fieldName, filterEl.value);
  }
  filterEl.addEventListener("keyup", updateFilter);
};
setupFilter("lastName");
setupFilter("departement");

var psyListElement = document.getElementById("psy-list");
var psyList = JSON.parse(psyListElement.textContent);

var table = new Tabulator("#psy-table", {
  data: psyList, //assign data to table
  langs:{ // http://tabulator.info/docs/4.2/localize#setup
    "fr-fr":{ //French language definition
      "pagination":{
        "first":"Première",
        "first_title":"Première Page",
        "last":"Dernière",
        "last_title":"Dernière Page",
        "prev":"Précédent",
        "prev_title":"Page Précédente",
        "next":"Suivant",
        "next_title":"Page Suivante",
      },
      "headerFilters":{
      "default":"Rechercher par adresse", //default header filter placeholder text
      }
    },
  },
  tooltipsHeader:true,
  layout:"fitData",       //fit columns to width of table
  responsiveLayout:true,  //hide columns that dont fit on the table //@TODO
  tooltips:true,            //show tool tips on cells
  addRowPos:"top",           //when adding a new row, add it to the top of the table
  history:true,              //allow undo and redo actions on the table
  pagination:"local",         //paginate the data
  paginationSize:50,        //allow XX rows per page of data
  movableColumns:false,        //allow column order to be changed
  resizableRows:false,          //allow row order to be changed
  resizableColumns:false,
  columns:[
    {title:"Nom", field:"lastName", sorter:"string", responsive:0},
    {title:"Prénom(s)", field:"firstNames", sorter:"string", responsive:0},
    {title:"Département", field:"departement", sorter:"string", maxWidth: 300, responsive:0, formatter:"text"},
    {title:"Adresse", field:"address", sorter:"string", maxWidth: 300, minWidth: 250, responsive:0, formatter:"link", formatterParams:{labelField:"address",urlPrefix:"https://www.openstreetmap.org/search?query=",target:"_blank"}},
    {title:"Téléphone", field:"phone", sorter:"string", responsive:0, formatter: "link", formatterParams:{labelField:"phone",urlPrefix:"tel:"}},
    {title:"Email", field:"email", sorter:"string", responsive:0, formatter:"link", formatterParams:{labelField:"email",urlPrefix:"mailto:"}},
    {title:"Téléconsultation", field:"teleconsultation",  headerTooltip: "Téléconsultation", responsive:0,sorter:"string", hozAlign:"center",tooltip: "Est ce que le psychologue accepte la téléconsultation ?", formatter:"tickCross"},
    {title:"Langues parlées", field:"languages", responsive:0,sorter:"string", hozAlign:"center", formatter:"textarea"},
    {title:"Site web", field:"website", sorter:"string", maxWidth:200, responsive:0, formatter:"link", formatterParams:{labelField:"website",target:"_blank"}},
  ],
  headerFilterPlaceholder:"Rechercher un psychologue" // http://tabulator.info/docs/4.9/filter#header
});
table.setLocale("fr-fr");
