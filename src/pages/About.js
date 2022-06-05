import { MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import React from "react";

const About = () => {
  return (
    <div style={{ marginTop: "100px" }}>
      <MDBContainer>
        <MDBTypography note noteColor="primary">
          <h1>チーム5</h1>
          このプロジェクトはチーム5で発展しました。
          <h4>チームメンバー：</h4>
          <ul style={{ listStyle: "none" }}>
            <li>Vu Duc Tuyen</li>
            <li>Luu Duc Anh</li>
            <li>Doan Van Hau</li>
            <li>Bui Van Khuong</li>
            <li>Tran Quang Nam</li>
            <li>Luu Van Dong</li>
          </ul>
        </MDBTypography>
      </MDBContainer>
    </div>
  );
};

export default About;
