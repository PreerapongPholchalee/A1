#!/bin/zsh

# กำหนดตัวแปร
PROJECT_DIR="/workspaces/codespaces-react"
COMPONENTS_DIR="$PROJECT_DIR/src/components/ui"

# สร้างโฟลเดอร์ components/ui ถ้ายังไม่มี
mkdir -p $COMPONENTS_DIR

# ฟังก์ชันสำหรับสร้างไฟล์คอมโพเนนต์
create_component() {
    local name=$1
    local content=$2
    echo "$content" > "$COMPONENTS_DIR/$name.js"
    echo "Created $name.js"
}

# สร้างคอมโพเนนต์ Button
create_component "Button" "
import React from 'react';

export const Button = ({ children, className, ...props }) => (
  <button className={\`px-4 py-2 bg-blue-500 text-white rounded \${className}\`} {...props}>
    {children}
  </button>
);
"

# สร้างคอมโพเนนต์ Card
create_component "Card" "
import React from 'react';

export const Card = ({ children, className, ...props }) => (
  <div className={\`bg-white shadow-md rounded-lg \${className}\`} {...props}>
    {children}
  </div>
);
"

# สร้างคอมโพเนนต์ Dialog
create_component "Dialog" "
import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

export const Dialog = DialogPrimitive.Root;
Dialog.Trigger = DialogPrimitive.Trigger;
Dialog.Content = DialogPrimitive.Content;
Dialog.Title = DialogPrimitive.Title;
Dialog.Description = DialogPrimitive.Description;
Dialog.Close = DialogPrimitive.Close;

Dialog.Header = ({ children }) => <div className='mb-4'>{children}</div>;
Dialog.Footer = ({ children }) => <div className='mt-4 flex justify-end'>{children}</div>;
"

# สร้างคอมโพเนนต์ Input
create_component "Input" "
import React from 'react';

export const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    className={\`px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 \${className}\`}
    ref={ref}
    {...props}
  />
));
"

# สร้างคอมโพเนนต์ Label
create_component "Label" "
import React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';

export const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={\`text-sm font-medium text-gray-700 \${className}\`} {...props} />
));
"

# สร้างคอมโพเนนต์ Select
create_component "Select" "
import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';

export const Select = SelectPrimitive.Root;
Select.Trigger = SelectPrimitive.Trigger;
Select.Value = SelectPrimitive.Value;
Select.Icon = SelectPrimitive.Icon;
Select.Portal = SelectPrimitive.Portal;
Select.Content = SelectPrimitive.Content;
Select.Viewport = SelectPrimitive.Viewport;
Select.Item = SelectPrimitive.Item;
Select.ItemText = SelectPrimitive.ItemText;
Select.ItemIndicator = SelectPrimitive.ItemIndicator;
"

# อัปเดตไฟล์ App.js
cat << EOF > "$PROJECT_DIR/src/App.js"
import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from './components/ui/Button';
import { Card } from './components/ui/Card';
import { Dialog } from './components/ui/Dialog';
import { Input } from './components/ui/Input';
import { Label } from './components/ui/Label';
import { Select } from './components/ui/Select';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Lazada Clone</h1>
      <Card className="p-4 mb-4">
        <h2 className="text-xl mb-2">Welcome to our store</h2>
        <Globe className="w-6 h-6 mb-2" />
        <p>Explore our wide range of products!</p>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="search">Search Products</Label>
          <Input id="search" placeholder="Enter product name" />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select id="category">
            <Select.Trigger className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm">
              <Select.Value placeholder="Select a category" />
            </Select.Trigger>
            <Select.Portal>
              <Select.Content>
                <Select.Viewport>
                  <Select.Item value="">
                    <Select.ItemText>All Categories</Select.ItemText>
                  </Select.Item>
                  <Select.Item value="electronics">
                    <Select.ItemText>Electronics</Select.ItemText>
                  </Select.Item>
                  <Select.Item value="clothing">
                    <Select.ItemText>Clothing</Select.ItemText>
                  </Select.Item>
                  <Select.Item value="books">
                    <Select.ItemText>Books</Select.ItemText>
                  </Select.Item>
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select>
        </div>
      </div>
      
      <Button className="mt-4">Search</Button>
      
      <Dialog>
        <Dialog.Trigger asChild>
          <Button variant="outline" className="mt-4 ml-2">Need Help?</Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl">
            <Dialog.Header>
              <Dialog.Title className="text-lg font-semibold">Customer Support</Dialog.Title>
              <Dialog.Description className="text-sm text-gray-500">
                How can we assist you today?
              </Dialog.Description>
            </Dialog.Header>
            <div className="mt-4">
              <Label htmlFor="message">Your Message</Label>
              <Input id="message" placeholder="Type your question here" />
            </div>
            <Dialog.Footer>
              <Button type="submit">Send</Button>
            </Dialog.Footer>
            <Dialog.Close className="absolute top-2 right-2">×</Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </div>
  );
}

export default App;
EOF

echo "Updated App.js"

# ติดตั้ง dependencies ที่จำเป็น
npm install @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-select lucide-react

echo "Installation and setup complete. You can now run 'npm start' to launch your lazada-like-web-app."