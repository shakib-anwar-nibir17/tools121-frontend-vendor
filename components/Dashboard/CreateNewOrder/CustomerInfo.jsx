import {
  CopySVG,
  CustomerSVG,
  EmailSVG2,
  InvoiceSVG,
  PhoneSVG2,
  ShippingAddressSVG,
  ShippingSVG,
  ShippingSVG2,
} from "@/components/icons/Icons";
const CustomerInfo = () => {
  return (
    <div className="mt-14 flex gap-11">
      <div className="w-[408px] border border-slate-200 p-6 rounded-lg">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-6">
          <InvoiceSVG />
          <h1 className="text-xl font-semibold text-black">
            General Information
          </h1>
        </div>
        <div className="mt-6">
          <div className="flex gap-2.5">
            <CustomerSVG />
            <div>
              <p className="text-sm">Custoner</p>
              <p className="text-sm text-black">Jay Hadgunson</p>
            </div>
          </div>
          <div className="mr-12 flex justify-between mt-[18px]">
            <div className="flex gap-2.5">
              <EmailSVG2 />
              <div>
                <p className="text-sm">Email</p>
                <p className="text-sm text-black">jay.hadgunson@mail.com</p>
              </div>
            </div>
            <CopySVG />
          </div>
          <div className="pr-12 flex justify-between mt-[18px]">
            <div className="flex gap-2.5">
              <PhoneSVG2 />
              <div>
                <p className="text-sm">Phone Number</p>
                <p className="text-sm text-black">050 414 8788</p>
              </div>
            </div>
            <CopySVG />
          </div>
        </div>
      </div>
      <div className="w-[408px] border border-slate-200 p-6 rounded-lg">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-6">
          <ShippingSVG />
          <h1 className="text-xl font-semibold text-black">Shipping</h1>
          <hr className="border-2 mt-7 border-slate-200" />
        </div>
        <div className="mt-6">
          <div className="px-6 flex justify-between mt-[18px]">
            <div className="flex gap-2.5">
              <ShippingAddressSVG />
              <div>
                <p className="text-sm">Shipping Address</p>
                <p className="text-sm text-black w-[260px]">
                  Address.32, Justice SM Morshed Sharany Agargoan Sher-e-Bangla
                  Nagar Dhaka-1207, Bangladesh
                </p>
              </div>
            </div>
            <CopySVG />
          </div>

          <div className="px-6 flex justify-between mt-[18px]">
            <div className="flex gap-2.5">
              <ShippingSVG2 />
              <div>
                <p className="text-sm">Shipping Method</p>
                <p className="text-sm text-black">regular</p>
              </div>
            </div>
          </div>
          <div className="px-6 flex justify-between mt-[18px]">
            <div className="flex gap-2.5">
              <ShippingSVG2 />
              <div>
                <p className="text-sm">Invoice Note</p>
                <p className="text-sm text-black">Invoice should get in time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;
