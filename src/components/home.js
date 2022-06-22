import moment from "moment";
import { useEffect, useState } from "react";
import { Button, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { serverBaseUrl } from "../endpoints";
import { getLeads } from "../services/getLeads";
import { getWebhooks } from "../services/getWebhooks";
import Leads from "./leads";
import Sidebar from "./sidebar";

const Home = () => {
  let { userId } = useParams();

  const [webhooks, setWebhooks] = useState([]);

  useEffect(() => {
    getWebhooks(userId)
      .then((response) => {
        setWebhooks(response.data.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, [userId]);

  const fetchLeads = (webhook) => {
    getLeads(webhook.id)
      .then((response) => {
        buildColums(response.data.data);
        buildRows(response.data.data);
        setDatatable({
          columns: columns,
          rows: rows,
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

  const [selectedWebhook, setSelectedWebhook] = useState();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      serverBaseUrl + "/webhook/" + selectedWebhook.id
    );
  };

  let columns = [];
  let rows = [];

  const buildColums = (leads) => {
    for (const i in leads) {
      const lead = leads[i];
      for (const i in lead) {
        if (i !== "other_fields") {
          const header = {
            label: i,
            field: i,
          };

          if (!columns.some((e) => e.field === header.field)) {
            columns.push(header);
          }
        } else {
          for (const j in lead[i]) {
            const header = {
              label: j,
              field: j,
            };

            if (!columns.some((e) => e.field === header.field)) {
              columns.push(header);
            }
          }
        }
      }
    }

  };

  const flattenObject = (obj) => {
    const flattened = {};

    Object.keys(obj).forEach((key) => {
      const value = obj[key];

      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        Object.assign(flattened, flattenObject(value));
      } else {
        flattened[key] = value;
      }
    });

    return flattened;
  };

  const buildRows = (leads) => {
    rows = leads.map((lead) => {
      let fo = flattenObject(lead);
      let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      fo["created_at"] = new Date(fo["created_at"]).toLocaleTimeString(
        "en-US",
        options
      );
      return fo;
    });
  };

  const [datatable, setDatatable] = useState();

  return (
    <Col style={{ paddingTop: "50px" }}>
      {selectedWebhook && (
        <Row className="text-center">
          <h4>Your Webhook URL</h4>

          <OverlayTrigger
            overlay={<Tooltip id="tooltip-disabled">Click to copy!</Tooltip>}
          >
            <Button
              variant="light"
              onClick={copyToClipboard}
              style={{ textTransform: "none" }}
            >
              {serverBaseUrl + "/webhook/" + selectedWebhook.id}
            </Button>
          </OverlayTrigger>
        </Row>
      )}
      <Row>
        <Col xs={3}>
          <Sidebar
            userId={userId}
            webhooks={webhooks}
            setWebhooks={setWebhooks}
            selectedWebhook={selectedWebhook}
            setSelectedWebhook={setSelectedWebhook}
            fetchLeads={fetchLeads}
          />
        </Col>

        <Col xs={1}></Col>

        <Col xs={8}>
          <Leads datatable={datatable} />
        </Col>
      </Row>
    </Col>
  );
};

export default Home;
