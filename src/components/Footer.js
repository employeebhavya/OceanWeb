import Image from "next/image";
import Styles from "./Footer.module.css";
import Link from "next/link";

function Footer() {
  return (
    <footer className={Styles.sectionFooter}>
      <div className="container">
        <div className={Styles.rowFooter}>
          <div className={Styles.columnFooter}>
            <Image src="/logo.png" alt="logo" width={100} height={100} />
          </div>
          <div className={Styles.columnFooter}>
            <div className={Styles.columnFooterRow}>
              <div className={Styles.columnFooterColumn}>
                <Link href="/">General Information</Link>
                <Link href="/">Privacy Policy</Link>
                <Link href="/">Legal Advisory</Link>
                <Link href="/">Company Overview</Link>
              </div>
              <hr style={{ height: "1px", color: "white" }} />
              <div className={Styles.columnFooterColumnLink}>
                <div>
                  <p>
                    Ocean Lifespaces India Pvt LtdMF-1, Industrial Estate,CIPET
                    Hostel Road, Guindy,Chennai - 600 032,<br></br> Tamil Nadu,
                    India.
                  </p>
                </div>
                <div>
                  <p style={{ display: "flex", flexDirection: "column" }}>
                    <span>Call Us: +91-98410 22110</span>
                    <span>Tel: +91-44-6919 9900</span>
                  </p>
                </div>
                <div>
                  <p>info@ocean.net.in</p>
                </div>
              </div>
            </div>
            <div className={Styles.columnFooterRow}>
              <p>
                Copyright © 2024 Ocean Lifespaces. All Rights Reserved. Designed
                by Tectra Technologies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
