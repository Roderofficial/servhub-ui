import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import serverService from "../../services/serverService";
import { Alert, Button } from "react-bootstrap";
import { UserContext } from "../../providers/userProvider";
import { useContext } from "react";

export default class TakeOwnership extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      serverId: this.props.serverId,
    };
  }

  getOwnershipServerRequestName = async (id) => {
    const res = await serverService.getOwnershipServerRequestName(id);
    return res;
  };

  showRequestOwnership = async () => {
    var server_name = await this.getOwnershipServerRequestName(
      this.state.serverId
    );

    Swal.fire({
      title: "Przejęcie serwera",
      html:
        'Aby przejąć serwer na własność zmienić nazwę swojego serwera na tę wskazaną poniżej, a następnie kliknąć przycisk "Sprawdź status". <br/> <br/> <b>Nazwa serwera: </b> <br /> <div class="alert alert-secondary" role="alert">' +
        server_name +
        "</div>",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Sprawdź status",
      cancelButtonText: "Anuluj",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.showLoading();
        Swal.fire({
          title: "Przejęcie serwera",
          text: "Sprawdzanie statusu serwera...",
          icon: "info",
          showCancelButton: false,
          showConfirmButton: false,
        });

        serverService
          .requestOwnership(this.state.serverId)
          .then((res) => {
            if (res == 200 || res == 204) {
              Swal.fire({
                title: "Przejęcie serwera",
                text: "Serwer został przejęty pomyślnie",
                icon: "success",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
              }).then((result) => {
                window.location.reload();
              });
            }
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              title: "Przejęcie serwera",
              text: "Wystąpił błąd podczas przejmowania serwera",
              icon: "error",
              showCancelButton: false,
              showConfirmButton: true,
            });
          });
      }
    });
  };

  render() {
    if (!this.context.user)
      return (
        <small className="text-muted">
          <i>Aby przejąć serwer na własność musisz być zalogowany</i>
        </small>
      );
    return (
      <>
        <Button variant="outline-primary" onClick={this.showRequestOwnership}>
          Przejmij serwer
        </Button>
      </>
    );
  }
}
