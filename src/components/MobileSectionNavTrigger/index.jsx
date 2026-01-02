import React, { useState } from "react";
import { Drawer } from "rsuite";
import Btn from "components/Btn";

const MobileSectionNavTrigger = ({ sections }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Btn
        icon="compass"
        onClick={() => setOpen(true)}
        className="section-nav-trigger"
      />

      <Drawer
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Drawer.Header>
          <Drawer.Title>Sections</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <Sidenav className="san-accordion">
            <Sidenav.Header>{title || "Sections"}</Sidenav.Header>
            <Sidenav.Body>
              <Nav>
                {sections.map((sect, i) => {
                  return (
                    <Nav.Item
                      href={sect.isScroller ? `/#${sect.id}` : sect.url}
                    >
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
