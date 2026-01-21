import { useState } from "react";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import Btn from "components/Btn";
import { Drawer, Nav, Sidenav } from "rsuite";

const MobileSectionNavTrigger = ({ title = "", sections = [] }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Btn
        icon={faDownload}
        onClick={() => setOpen(true)}
        className="section-nav-trigger"
        ariaLabel="Open section navigation"
        tooltip="Open section navigation"
      />

      <Drawer placement="right" open={open} onClose={() => setOpen(false)}>
        <Drawer.Header>
          <Drawer.Title>Sections</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <Sidenav className="san-accordion">
            <Sidenav.Header>{title || "Page Sections"}</Sidenav.Header>
            <Sidenav.Body>
              <Nav>
                {sections.map((sect, i) => {
                  return (
                    <Nav.Item key={i} href={sect.isScroller ? `/#${sect.id}` : sect.url}>
                      {sect.title}
                    </Nav.Item>
                  );
                })}
              </Nav>
            </Sidenav.Body>
          </Sidenav>
        </Drawer.Body>
      </Drawer>
    </>
  );
};

export default MobileSectionNavTrigger;
