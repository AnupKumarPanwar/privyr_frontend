import { useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import CreateWebhook from "./createWebhook";

const Sidebar = ({
  userId,
  webhooks,
  setWebhooks,
  selectedWebhook,
  setSelectedWebhook,
  fetchLeads,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addWebhook = (webhook) => {
    webhooks.push(webhook);
    setWebhooks(webhooks);
  };

  return (
    <div>
      <Button variant="success" onClick={handleShow}>
        Create new webhook
      </Button>
      <div style={{ overflowY: "scroll", height: "500px" }}>
        <ListGroup>
          {webhooks.map((webhook) => (
            <ListGroup.Item
              key={webhook.id}
              action
              active={selectedWebhook && selectedWebhook.id === webhook.id}
              onClick={() => {
                setSelectedWebhook(webhook);
                fetchLeads(webhook);
              }}
            >
              {webhook.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <CreateWebhook
        userId={userId}
        show={show}
        handleClose={handleClose}
        onCreate={addWebhook}
      />
    </div>
  );
};

export default Sidebar;
