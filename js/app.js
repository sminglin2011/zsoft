var app = angular.module("app",[]);
app.directive("myTable", function() {
	return function(scope, element, attrs) {
        // apply DataTable options, use defaults if none specified by user
        var options = {};
        if (attrs.myTable.length > 0) {
            options = scope.$eval(attrs.myTable);
        } else {
            options = {
                "bStateSave": true,
                "iCookieDuration": 2419200, /* 1 month */
                "bJQueryUI": true,
                "bPaginate": false,
                "bLengthChange": false,
                "bFilter": false,
                "bInfo": false,
                "bDestroy": true
            };
        }
        //console.log(options,"options");
        var explicitColumns = [];
        element.find('th').each(function(index, elem) {
            explicitColumns.push({"title":$(elem).text()});
        });
        
        console.log(explicitColumns,"explicitColumns");
        if (explicitColumns.length > 0) {
            options["aoColumns"] = explicitColumns;
        } else if (attrs.aoColumns) {
            options["aoColumns"] = scope.$eval(attrs.aoColumns);
        }
        
        if (attrs.aoColumnDefs) {
            options["aoColumnDefs"] = scope.$eval(attrs.aoColumnDefs);
        }
        
        if (attrs.fnRowCallback) {
            options["fnRowCallback"] = scope.$eval(attrs.fnRowCallback);
        }
       
        // apply the plugin
        var dataTable = element.dataTable(options);
        console.log(scope.$eval(attrs.aaData),"aa");
        
        scope.$watch(attrs.aaData, function(value) {
        	console.log(attrs.aaData,"attrs.aaData");
            var val = value || null;
            if (val) {
                dataTable.fnClearTable();
                dataTable.fnAddData(scope.$eval(attrs.aaData));
            }
        }); 
    };
});