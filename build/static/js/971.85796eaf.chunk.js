"use strict";
(self.webpackChunkberry_free_material_react_cra =
  self.webpackChunkberry_free_material_react_cra || []).push([
  [971],
  {
    3971: function (e, r, a) {
      a.r(r);
      a(7313);
      var i = a(1095),
        l = a(6835),
        c = a(3477),
        n = a(4076),
        s = a(7478),
        d = a(3467),
        t = a(7131),
        h = a(1207),
        m = a(4481),
        o = a(8467),
        x = a(3497),
        p = a(6417);
      r.default = () => {
        const e = (0, o.s0)();
        return (0, p.jsx)(p.Fragment, {
          children: (0, p.jsx)(x.Z, {
            title: "Customers",
            secondary: (0, p.jsx)(i.Z, {
              variant: "contained",
              color: "primary",
              onClick: () => {
                e("/add-customer");
              },
              children: "Add Customer",
            }),
            children: (0, p.jsxs)(l.Z, {
              children: [
                (0, p.jsx)(c.Z, {
                  children: (0, p.jsxs)(n.Z, {
                    children: [
                      (0, p.jsx)(s.Z, { children: "Supermarket" }),
                      (0, p.jsx)(s.Z, { children: "Phone" }),
                      (0, p.jsx)(s.Z, { children: "Email" }),
                      (0, p.jsx)(s.Z, { children: "POC Name" }),
                      (0, p.jsx)(s.Z, { children: "Actions" }),
                    ],
                  }),
                }),
                (0, p.jsx)(d.Z, {
                  children: [
                    {
                      id: 1,
                      supermarket: "Supermarket 1",
                      phone: "123-456-7890",
                      email: "supermarket1@example.com",
                      pocName: "John Doe",
                    },
                    {
                      id: 2,
                      supermarket: "Supermarket 2",
                      phone: "987-654-3210",
                      email: "supermarket2@example.com",
                      pocName: "Jane Smith",
                    },
                  ].map((e) =>
                    (0, p.jsxs)(
                      n.Z,
                      {
                        children: [
                          (0, p.jsx)(s.Z, { children: e.supermarket }),
                          (0, p.jsx)(s.Z, { children: e.phone }),
                          (0, p.jsx)(s.Z, { children: e.email }),
                          (0, p.jsx)(s.Z, { children: e.pocName }),
                          (0, p.jsxs)(s.Z, {
                            children: [
                              (0, p.jsx)(t.Z, {
                                color: "primary",
                                "aria-label": "edit",
                                onClick: () => handleEdit(e.id),
                                children: (0, p.jsx)(h.Z, {}),
                              }),
                              (0, p.jsx)(t.Z, {
                                color: "secondary",
                                "aria-label": "delete",
                                onClick: () => handleDelete(e.id),
                                children: (0, p.jsx)(m.Z, {}),
                              }),
                            ],
                          }),
                        ],
                      },
                      e.id
                    )
                  ),
                }),
              ],
            }),
          }),
        });
      };
    },
  },
]);
