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

  requrest_ownership = async () => {
    Swal.fire({
      title: "Przejęcie serwera",
      text: "Sprawdzanie statusu serwera...",
      icon: "info",
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      allowOutsideClick: false,
      showClass: {
        popup: "",
        icon: "",
      },
      hideClass: {
        popup: "",
      },
    });
    const res = await serverService.requestOwnership(this.state.serverId);
    if (res.status == 200) {
      Swal.fire({
        title: "Przejęcie serwera",
        text: "Poprawnie przejęto serwer na własność!",
        icon: "success",
        showCancelButton: false,
        showConfirmButton: true,
      });
    } else {
      Swal.fire({
        title: "Przejęcie serwera",
        text: "Wystąpił błąd podczas przejmowania serwera na własność! Sprawdż czy nazwa serwera jest poprawna i spróbuj ponownie.",
        icon: "error",
        showCancelButton: false,
        showConfirmButton: true,
      });
    }
  };

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
        this.requestOwnership();
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
