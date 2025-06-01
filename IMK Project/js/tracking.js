// Global map and icon references
let map, shipIcon, currentPolygon, currentPolygonMarkers = [];

// Inisialisasi peta hanya sekali
function initTrackingMap() {
  if (!map) {
    map = L.map('map').setView([0.9197, 104.4540], 14); // Tanjungpinang
    shipIcon = L.icon({
      iconUrl: 'gambar/kapal.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -35]
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; CargoWave'
    }).addTo(map);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);
  }
}

// Update polygon & markers pada peta
function updateMapWithPolygon(polygon) {
  // Hapus polygon & marker lama
  if (currentPolygon) map.removeLayer(currentPolygon);
  if (currentPolygonMarkers && Array.isArray(currentPolygonMarkers)) {
    currentPolygonMarkers.forEach(m => map.removeLayer(m));
  }
  currentPolygonMarkers = [];

  if (Array.isArray(polygon) && polygon.length > 1) {
    currentPolygon = L.polyline(polygon, {color: '#ff7800', weight: 3}).addTo(map);
    currentPolygonMarkers = polygon.map(coord => L.marker(coord, {icon: shipIcon}).addTo(map));
    let group = new L.featureGroup([currentPolygon, ...currentPolygonMarkers]);
    setTimeout(function() {
      map.invalidateSize();
      map.fitBounds(group.getBounds());
    }, 200);
  }
}


// Fungsi untuk melakukan AJAX request tracking
function trackShipment(id) {
  let url = "https://nexovia.my.id/cargo-api/tracking.php?resi=" + id;
  // Tampilkan loading
  $("#tracking-empty").addClass("hide");
  $("#tracking-error").addClass("hide");
  $("#tracking-result").addClass("hide");
  $("#tracking-search").removeClass("hide");

  $.ajax({
    url: url,
    method: 'GET',
    dataType: 'json',
    success: function(response) {
      $("#tracking-search").addClass("hide");
      // Cek response sukses atau error (misal response.success atau response.code)
      if (response && (response.status === 'Success' || response.code === 200)) {
        var data = response.data || {};
        // Update polygon/marker sesuai data
        updateMapWithPolygon(data.polygon);

        // Update info pengiriman
        $("#shipment-id").text(data.no_ref || '-');
        $("#shipment-nama").text(data.nama_penerima || '-');
        $("#shipment-tanggal").text(data.date || '-');
        $("#shipment-resi").text(data.resi || '-');
        $("#shipment-alamat").text(data.alamat || '-');
        // Stepper (highlight)
        var $stepper = $("#stepper-wrapper");
        $stepper.empty();
        if (Array.isArray(data.highlight)) {
          data.highlight.forEach(function(step) {
            var stepClass = 'stepper-item';
            if (step.completed) {
              stepClass += ' completed';
            } else if (step.active) {
              stepClass += ' active';
            }
            $stepper.append(
              '<div class="' + stepClass + '">' +
                '<div class="step-counter"></div>' +
                '<div class="step-name">' + (step.title || '-') + '</div>' +
              '</div>'
            );
          });
        }
        // Timeline/history
        var $timeline = $(".timeline-wrapper");
        $timeline.empty();
        if (Array.isArray(data.history)) {
          data.history.forEach(function(item) {
            var itemClass = 'timeline-item';
            if (item.active) itemClass += ' active';
            var dateTime = (item.date || '-').split(' ');
            var tgl = dateTime[0] || '-';
            var jam = dateTime[1] || '-';
            $timeline.append(
              '<div class="' + itemClass + '">' +
                '<div class="timeline-dot"></div>' +
                '<div class="timeline-item-content">' +
                  '<div class="timeline-item-header">' +
                    '<span class="date">' + tgl + '</span>' +
                    '<span class="time">' + jam + '</span>' +
                  '</div>' +
                  '<div class="timeline-item-description">' + (item.desc || '-') + '</div>' +
                '</div>' +
              '</div>'
            );
          });
        }
        $("#tracking-result").removeClass("hide");
      } else {
        // Tampilkan error dari API jika ada
        $("#tracking-error-message").text(response.message || 'Nomor resi tidak ditemukan. Silakan periksa kembali nomor resi Anda.');
        $("#tracking-error").removeClass("hide");
      }
    },
    error: function(xhr, status, error) {
      $("#tracking-search").addClass("hide");
      let msg = 'Terjadi kesalahan. Silakan coba lagi.';
      if (xhr.responseJSON && xhr.responseJSON.message) {
        msg = xhr.responseJSON.message;
      }
      $("#tracking-error-message").text(msg);
      $("#tracking-error").removeClass("hide");
    }
  });
}

// jQuery document ready
$(document).ready(function() {
  // Pastikan map sudah diinisialisasi sekali
  initTrackingMap();
  // Submit tracking
  $('#tracking-button').on('click', function() {
    var resi = $('#tracking-input').val().trim();
    if (resi) {
      trackShipment(resi);
    } else {
      // Tampilkan empty state jika input kosong
      $("#tracking-empty").removeClass("hide");
      $("#tracking-error").addClass("hide");
      $("#tracking-result").addClass("hide");
      $("#tracking-search").addClass("hide");
    }
  });
  // Enter key
  $('#tracking-input').on('keypress', function(e) {
    if (e.which === 13) {
      $('#tracking-button').click();
    }
  });
});


