// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable(API_URL + 'Coaches');  // Certificando que é para Coaches e não Athletes
    self.displayName = 'Paris2024 Coaches List';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    self.coaches = ko.observableArray([]);
    self.currentPage = ko.observable(1);
    self.pagesize = ko.observable(10);
    self.totalRecords = ko.observable(1);
    self.hasPrevious = ko.observable(false);
    self.hasNext = ko.observable(false);
    self.previousPage = ko.computed(function () {
        return self.currentPage() * 1 - 1;
    }, self);
    self.nextPage = ko.computed(function () {
        return self.currentPage() * 1 + 1;
    }, self);
    self.fromRecord = ko.computed(function () {
        return self.previousPage() * self.pagesize() + 1;
    }, self);
    self.toRecord = ko.computed(function () {
        return Math.min(self.currentPage() * self.pagesize(), self.totalRecords());
    }, self);
    self.totalPages = ko.observable(0);
    self.pageArray = function () {
        var list = [];
        var size = Math.min(self.totalPages(), 9);
        var step;
        if (size < 9 || self.currentPage() === 1)
            step = 0;
        else if (self.currentPage() >= self.totalPages() - 4)
            step = self.totalPages() - 9;
        else
            step = Math.max(self.currentPage() - 5, 0);

        for (var i = 1; i <= size; i++)
            list.push(i + step);
        return list;
    };
    self.favorites = ko.observableArray(JSON.parse(localStorage.getItem('favorites')) || []);
    self.filterOption = ko.observable('all');

    self.filteredCoaches = ko.computed(function () {
        if (self.filterOption() === 'favorites') {
            return self.coaches().filter(function (coach) {
                return self.isFavorite(coach);
            });
        }
        return self.coaches();
    });

    self.isFavorite = function (coach) {
        return self.favorites().some(function (fav) {
            return fav.Id === coach.Id;
        });
    };

    self.toggleFavorite = function (coach) {
        var favorites = self.favorites();
        var coachIndex = favorites.findIndex(function (fav) {
            return fav.Id === coach.Id;
        });

        if (coachIndex === -1) {
            favorites.push(coach);
        } else {
            favorites.splice(coachIndex, 1);
        }

        self.favorites(favorites);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    };

    //--- Page Events
    self.activate = function (id, search, order) {
        console.log('CALL: getCoaches...');
        var composedUri = self.baseUri();

        if (search == undefined) {
            search = "";
        }
        if (order == undefined) {
            order = 1;
        }

        composedUri = self.baseUri() + "?page=" + id + "&pageSize=" + self.pagesize() + "&order=" + order + "&search=" + search;
        console.log(composedUri);

        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            hideLoading();
            self.coaches(data.Coaches);
            self.currentPage(data.CurrentPage);
            self.hasNext(data.HasNext);
            self.hasPrevious(data.HasPrevious);
            self.pagesize(data.PageSize);
            self.totalPages(data.TotalPages);
            self.totalRecords(data.TotalCoaches);
        });
    };

    //--- Internal functions
    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("AJAX Call[" + uri + "] Fail...");
                hideLoading();
                self.error(errorThrown);
            }
        });
    }

    function showLoading() {
        $("#myModal").modal('show', {
            backdrop: 'static',
            keyboard: false
        });
    }
    function hideLoading() {
        $('#myModal').on('shown.bs.modal', function (e) {
            $("#myModal").modal('hide');
        })
    }

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    //--- start .... 
    showLoading();
    var pg = getUrlParameter('page');
    var search = getUrlParameter('search');
    var order = getUrlParameter('order');
    if (pg == undefined)
        self.activate(1, search, order);
    else {
        self.activate(pg, search, order);
    }
    console.log("VM initialized!");
};

$(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});

$(document).ajaxComplete(function (event, xhr, options) {
    $("#myModal").modal('hide');
})
